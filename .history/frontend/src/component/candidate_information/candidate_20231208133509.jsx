import React, { useEffect, useState } from "react";
import axios from "axios";
import Side from "../side/side.jsx";
import { useParams, Link } from "react-router-dom";
import '../styles/candidate.css';
require('dotenv').config();


const Candidate_information = () => {
    let params = useParams()
    let Useremail = params.Useremail
    let Title = params.Title
    let position = params.position
    const [candidate, setcandidate] = useState('')
    const [candidateName, setcandidateName] = useState('')
    const [Affiliate, setAffiliate] = useState('')

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/getcandidateinfo/${Useremail}/${Title}/${position}`)
        .then((res)=> {
            setcandidate(res.data)
        })
    })
    const candidate_function = () => {
        let image = document.querySelector("input[type=file]").files[0];

        const candidate_file_info = new FormData()
        candidate_file_info.append('candidateName', candidateName)
        candidate_file_info.append('position', position)
        candidate_file_info.append('Affiliate', Affiliate)
        candidate_file_info.append('Title', Title)
        candidate_file_info.append('Useremail', Useremail)
        candidate_file_info.append('image', image)

        fetch(`${process.env.REACT_APP_URL}/cadidateInformation`, {
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

    const button = (data) => {
        if (data.status === 'ok') {
            return(<>
            <div className="btn-controller">
                <button class="btn" data-toggle="modal" data-target="#devModal">Add candidate</button>
                <div className="btn-right">
                <Link to={'/Add_new_position'} id="btn_link">
                <button class="btn" id="can-btn">Add A new Position</button>
                </Link>
                <Link to={`/position/${Useremail}/${Title}`} id="btn_link">
                <button class="btn" id="can-btn">Finish</button>
                </Link>
                </div>
                </div>
                </>
            )
        } else{
            return(
                <></>
            )
        }
    }
    return(
        <div className="background">
        <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
        <div className="candidate">
        <Side/>
          <p id="position_title_name">{position.toUpperCase()}</p>
          <div className="candidate_side">
          {Array.isArray(candidate.data) && candidate.data.length > 0 ? (
                        candidate.data.map((title) => (
                            <>
                            <div className="candidate_profile">
                            <img src={`${process.env.REACT_APP_URL}/uploads/${title.image}`} alt={title.candidateName} id="candidate_img"/>
                            <div className="right">
                                <p className="label-candidate">{title.candidateName}</p>
                                <p className="label-candidate">{title.position}</p>
                            </div>
                            </div>
                            </>
                        ))
                    ) : (
                        <>
                        <p id="label">No data found</p>
                        <button className="btn" data-toggle="modal" data-target="#devModal">Add candidate</button> 
                        </>
                    )}
                    {button(candidate)}
            </div>
            </div>

<div id="devModal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div className="modal-content">
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
    )

}


export default Candidate_information