import React, { useEffect, useState } from "react";
import axios from "axios";
import Side from "../side/side";
import { useParams, Link } from "react-router-dom";
import '../styles/candidate.css';


const Candidate_information = () => {
    let params = useParams()
    let Useremail = params.Useremail
    let Title = params.Title
    let position = params.position
    const [candidate, setcandidate] = useState('')
    const [candidateName, setcandidateName] = useState('')
    const [Affiliate, setAffiliate] = useState('')

    useEffect(()=>{
        axios.get(`http://localhost:2000/getcandidateinfo/${Useremail}/${Title}/${position}`)
        .then((res)=> {
            setcandidate(res.data)
        })
    })
    const candidate_function = () => {
        let image = document.querySelector("input[type=file]").files[0];
        console.log(image);

        const candidate_file_info = new FormData()
        candidate_file_info.append('candidateName', candidateName)
        candidate_file_info.append('position', position)
        candidate_file_info.append('Affiliate', Affiliate)
        candidate_file_info.append('Title', Title)
        candidate_file_info.append('Useremail', Useremail)
        candidate_file_info.append('image', image)

        fetch('http://localhost:2000/cadidateInformation', {
            method: 'POST',
            body: candidate_file_info,
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
    return(
        <>
        <Side/>
        <div className="candidate">
          <p id="position_title_name">{position.toUpperCase()}</p>
          <div className="candidate_side">
          {Array.isArray(candidate.data) && candidate.data.length > 0 ? (
                        candidate.data.map((title) => (
                            <>
                            <div className="candidate_profile">
                            <img src={`http://localhost:2000/public/uploads/${title.image}`} alt={title.candidateName}/>
                                {console.log(title)}
                            </div>
                            <button class="btn" data-toggle="modal" data-target="#devModal">Add candidate</button>
                            </>
                        ))
                    ) : (
                        <>
                        <p id="label">No data found</p>
                        <button class="btn" data-toggle="modal" data-target="#devModal">Add candidate</button> 
                        </>
                    )}
            </div>

<div id="devModal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Add candidate</h4> 
                        </div>
                        <div class="modal-body">
                           <input type="text" placeholder="Candidate Name" id="candidate_name_input" onChange={(e)=>{setcandidateName(e.target.value)}}/>
                           <label for="inputTag">
                           <p id="add_icon">+</p>
                                <input id="inputTag" type="file" accept="image/png, image/jpg, image/gif, image/jpeg"/>
                            </label>
                            {/*<p id="image_text">Click to add image</p>*/}
                        </div>
                        <input type="text" placeholder="Affiliate(optional)" id="candidate_name_input" onChange={(e)=>{setAffiliate(e.target.value)}}/>
                        <div class="modal-footer">
                            <button class="btn" data-dismiss="modal" onClick={candidate_function}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}


export default Candidate_information