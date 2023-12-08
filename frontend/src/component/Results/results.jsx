import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Side from "../side/side.jsx";
import '../styles/results.css'
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

  const handleButtonClick = async(position) => {
    let candidateInfo = await getCandidateInfo(position)

    setResults({[position]: candidateInfo})
  }

  console.log(results);
  return (
    <>
      
      <div className="background">
        <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
      <div className="home_result">
       <Side />
        <h1 id="Position_title_result">{Title}</h1>
        <div className="home_body_result">
          {positions.length > 0 ? (
            positions.map((title) => (
              <div className="Add_new_result" key={title.position}>
                <p id="poll_result">{title.position}</p>
                <button type="button" onClick={() => handleButtonClick(title.position)} id="button_result">
                  View the number of votes
                </button>
                
                {/* Display candidate information */}
                {results[title.position] && results[title.position].length > 0 ? (
                  <div className="div_result">
                    <h3 className="result_header">Candidates for {title.position}</h3>
                    {results[title.position].map((candidate) => (
                      <div key={candidate._id} className="first_data_for_results">
                        <img src={`${process.env.REACT_APP_URL}/uploads/${candidate.image}`} alt={candidate.candidateName} id="img-for-candidate"/>
                        <p id="result-candidateName">Candidate: {candidate.candidateName}</p>
                        {candidate.data ? (
                          <p id="votes">{candidate.data.length}: Votes</p>
                        ) : (
                          <p id="votes">0: Votes</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                </div>
          ))
          ) : (
            <h1>No data found</h1>
          )}
        </div> 
      </div>
      </div>
      </>
  );
};

export default Results;
