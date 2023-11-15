import React from 'react';
import '../styles/voter-id.css';
import Side from '../side/side';
import { Link } from 'react-router-dom';

const Voter = () => {
let Useremail = window.sessionStorage.getItem('email')

    const voter_id = () => {
              document.getElementById('link_message').innerText = `This is your link: http://localhost:3000/sent/${Useremail}`;
    }

    const csv_package = () => {
        let csvfile = document.getElementById('voter_img').files[0];
        if (csvfile.name) {
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
    }

    const csvfolder = document.getElementById('add_icon')
    if (csvfolder) {
        csvfolder.addEventListener('click', () => {
            document.getElementById('voter_img').click();
            csv_package()
        })
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
                            <input type="file" name="Csv" id="voter_img" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                        </label>
                        <p id="voter_imgtext">Upload us csv file here</p>
                    </div>
                </div>

                <div className="voter-generate_link">
                    <h3 id="voter_sub-header">Allow any body that has registered to vote with the generated link to vote</h3>
                    <button id="generate_link" onClick={voter_id}>Generate Link</button>
                </div>
                <center><p id="link_message"></p></center>
                <center><Link to={`preview_page/${Useremail}`}><button id="preview">Preview All the Voter</button></Link></center>
          </div>  
        </>
    )

}

export default Voter;