import React, { useEffect, useState } from 'react';
import Side from '../side/side';
import '../styles/voter.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Voter_preview = () => {
    const params = useParams()
    let Useremail = params.Useremail
    const [voter, setvoter] = useState("")
    useEffect(()=>{
        axios.get(`http://localhost:2000/csvusers/${Useremail}`)
        .then(res=>{
            setvoter(res.data)
        })
    },[])


    return(
        <>
        <Side/>
        <div className="voter_preview">
            <h1>Preview your Voter ID</h1>
            <table className='table'>
                            <thead>
                                <tr className='table-dark'>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>email</th>
                                </tr>
                            </thead>
            {Array.isArray(voter.data) && voter.data.length > 0 ? (
                        voter.data.map((title) => (
                            <>
                                <tbody>
                                    <tr className='table-hover'>
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
        </>
    )
}



export default Voter_preview;