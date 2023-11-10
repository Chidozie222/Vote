import React, { useState } from 'react';
import '../styles/voter-id.css';
import Side from '../side/side';


const Voter = () => {
    const [voter, setvoter] = useState("")
    let Useremail = window.sessionStorage.getItem('email')

    const voter_csv = () => {
        let csvfile = document.querySelector("input[type=file]").files[0];

        const csv = new FormData
        csv.append('csvfile', csvfile)

        
        fetch('http://localhost:2000/csvfile', {
            method: 'POST',
            body: csvfile,
        })
        .then(res => res.json())
        .then(data=>{
            if (data.status === 'ok') {
                alert(data.message)
            } else {
                alert(data.message)
            }
        })
    }

    const voter_id = () => {
        return(
            <>
                <p id='register_link'>This is your link: http://localhost:3000/voterprofile/{Useremail}</p>
            </>
        )
    }

    return(
        <>
          <Side/>
          <div className='voter_id'>
                <center><h1 id='Voter_header'>Voter ID</h1></center>
                <div className="voter_body">
                    <div className="voter_context">
                        <p id="voter_direction">Allow the people you want to vote by create a csv file with the header:</p>
                        <ol className="voter_style">
                            <li>Name-name of the voter</li>
                            <li>Code-unique code for the voter</li>
                            <li>email-email of the voter</li>
                            <li>Useremail-email you registered on our platform</li>
                        </ol>
                    </div>
                    <div className="voterid_image">
                        <label htmlFor="Csv" className="voter_img">
                            <p id="add_icon">+</p>
                            <input type="file" name="Csv" id="voter_img"/>
                        </label>
                        <p id="voter_imgtext">Upload us csv file here</p>
                    </div>
                </div>

                <div className="voter-generate_link"></div>
          </div>  
        </>
    )

}

export default Voter;