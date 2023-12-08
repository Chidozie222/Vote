import React, { useEffect, useState } from 'react';
import Side from '../side/side.jsx';
import '../styles/voter.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
require('dotenv').config();


const Voter_preview = () => {
    const params = useParams()
    let Useremail = params.Useremail
    const [voter, setvoter] = useState("")
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/csvusers/${Useremail}`)
        .then(res=>{
            setvoter(res.data)
        })
    })


    return(
        <>
            
                                <div className="background">
        <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
                <div className="voter_preview">
                    <Side />
            <h1>Preview your Voter ID</h1>
            <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>email</th>
                                </tr>
                            </thead>
            {Array.isArray(voter.data) && voter.data.length > 0 ? (
                        voter.data.map((title) => (
                                <tbody>
                                    <tr>
                                        <td>{title.Name}</td>
                                        <td>{title.code}</td>
                                        <td>{title.email}</td>
                                    </tr>
                                </tbody>
                            </>
                        ))
                    ) : (
                        <></>
                    )}
                    </table>
                    </div>
        </div> 
        </>
    )
}



export default Voter_preview;