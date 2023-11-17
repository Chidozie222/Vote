import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Side from "../side/side";
import '../styles/home.css';
require('dotenv').config();

const Results = () => {
  const params = useParams();
  const Useremail = params.Useremail;
  const Title = params.Title;

  const [positions, setPositions] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/position_title/${Useremail}/${Title}`)
      .then((res) => {
        setPositions(res.data.data || []);
      })
      .catch((error) => {
        console.error('Error fetching positions:', error);
      });
  }, [Useremail, Title]);

  const getCandidateInfo = async (position) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/getcandidateinfo/${Useremail}/${Title}/${position}`);
      return response.data.data || [];
    } catch (error) {
      console.error(`Error fetching candidate info for ${position}:`, error);
      return [];
    }
  };
  const getVotingResults = async (position, candidateName) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/results/${Useremail}/${Title}/${position}/${candidateName}`);
      const votingResults = response.data.data || [];

      // Group the data based on candidateName
      const groupedResults = votingResults.reduce((grouped, result) => {
        const candidateName = result.candidateName;

        if (!grouped[candidateName]) {
          grouped[candidateName] = [];
        }

        grouped[candidateName].push(result);

        return grouped;
      }, {});

      // Count occurrences of each candidate group
      const groupCounts = Object.keys(groupedResults).map(candidateName => {
        const groupData = groupedResults[candidateName];
        const totalCount = groupData.length;

        return { candidateName: candidateName, totalCount };
      });

      return { groupedResults, groupCounts };
    } catch (error) {
      console.error(`Error fetching voting results for ${candidateName}:`, error);
      return {};
    }
  };


  const handleButtonClick = async (position) => {
    const candidateInfo = await getCandidateInfo(position);

    // Call the getVotingResults function and log the results
    for (let index = 0; index < candidateInfo.length; index++) {
        const resultData = await getVotingResults(position, candidateInfo[index].candidateName);
        setResults({ [position]: candidateInfo, resultData});
    }
    
  };

  console.log(results);
  return (
    <>
      <Side />
      <div className="home">
        <h1 id="Position_title">{Title}</h1>
        <div className="home_body">
          {positions.length > 0 ? (
            positions.map((title) => (
              <div className="Add_new" key={title.position}>
                <p id="poll">{title.position}</p>
                <button type="button" onClick={() => handleButtonClick(title.position)}>
                  View the number of votes
                </button>

                {/* Display candidate information */}
                {results[title.position] && results[title.position].length > 0 ? (
                  <div>
                    <h3>Candidates for {title.position}</h3>
                    {results[title.position].map((candidate) => (
                      <div key={candidate._id}>
                        <p>Candidate: {candidate.candidateName}</p>
                        <img src={`${process.env.REACT_APP_URL}/uploads/${candidate.image}`} alt={candidate.candidateName} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <h4>No candidates found for {title.position}</h4>
                )}
              </div>
            ))
          ) : (
            <h1 id="world">Wait for the result data</h1>
          )}
        </div>
      </div>
    </>
  )
};

export default Results;
