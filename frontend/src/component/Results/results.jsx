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
    const name = candidateInfo?.map((candidate) => candidate.candidateName)
    console.log(name);
    // Call the getVotingResults function and log the results
    for (let index = 0; index < name.length; index++) {
      const votingResults = await getVotingResults(position, name[index]);
      if (votingResults && votingResults.groupCounts) {
        // Loop through the web array and fetch candidateName values
        const webCandidates = candidateInfo?.map((candidate) => candidate.candidateName);
        let webs = webCandidates
        if (webs.length>0) {
          for (let i = 0; i < webs.length; i++) {
            let websmart = webs[i]
            setResults({ [position]: candidateInfo, resultsData: votingResults });
            return websmart
          }
        }
      } else {
        console.error('Error fetching voting results');
      }
    }

    
    // Check if votingResults contains valid data
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
                    {/* Display additional results based on voting data */}
                    {results.webs?.map((file) => (
                      <div>
                        {console.log(results.resultsData[file])}
                        {results.resultsData && results.resultsData[file] ? (
                          <div>
                            {results.resultsData[file].groupCounts?.map((item) => (
                              <div className="class" key={item.candidateName}>
                                <p>{item.candidateName}: {item.totalCount}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <h4>No additional voting results found for {file}</h4>
                        )}
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
  );
};

export default Results;
