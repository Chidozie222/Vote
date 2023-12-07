import React, { useState } from "react";
import Side from "../side/side.jsx";
import '../styles/title.css'
import { Link, useNavigate } from "react-router-dom";
require('dotenv').config();

const Position_form = () => {
    const [Position_form, setposition_form] = useState("")
    let navigate = useNavigate()
    let Useremail = window.sessionStorage.getItem('email')
    let Title = window.sessionStorage.getItem('title')
    const title_function = (e) => {
        e.preventDefault();
        let Title1 = document.getElementById('error')
        if (Position_form.trim().length===0) {
            Title1.innerText= 'please input your Position'
        } else {
            fetch(`${process.env.REACT_APP_URL}/position_title`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    position: Position_form,
                    Title,
                    Useremail
                }),
                })
                .then(res => res.json())
                .then(data=> {
                    if (data.status === 'ok') {
                        alert(data.message)
                        navigate(`/candidate/${Useremail}/${Title}/${Position_form}`)
                    } else {
                        alert(data.message)
                    }
                }) 
        }
     
    }
    return(
        <>
        <Side/>
            <div className="title">
                <div className="content">
                    <p id="label">Position:</p>
                    <input type="text" id="title_holder" onChange={(e)=>{setposition_form(e.target.value)}}/>
                    <p id="error"></p>
                    <div className="title_button">
                        <Link to={`/position/${Useremail}/${Title}`} id="link">
                            <button type="button" id="title_back_btn" className="title_btn">
                                Back
                            </button>
                        </Link>
                        <button type="button" id="title_next_btn" className="title_btn" onClick={title_function}>
                                Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Position_form