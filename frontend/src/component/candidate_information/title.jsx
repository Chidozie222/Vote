import React, { useState } from "react";
import Side from "../side/side.jsx";
import '../styles/title.css'
import { Link, useNavigate } from "react-router-dom";
require('dotenv').config();

const Title = () => {
    const [title, settitle] = useState("")
    let navigate = useNavigate()
    const title_function = (e) => {
        e.preventDefault();
        let Title1 = document.getElementById('error')
        let Useremail = window.sessionStorage.getItem('email')
        if (title.trim().length===0) {
            Title1.innerText= 'please input your Election Title'
        } else {
            fetch(`${process.env.REACT_APP_URL}/title`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    Title: title.toLocaleLowerCase(),
                    Useremail
                }),
                })
                .then(res => res.json())
                .then(data=> {
                    if (data.status === 'ok') {
                        alert(data.message)
                        navigate(`/position/${Useremail}/${title}`)
                    } else {
                        alert(data.message)
                    }
                }) 
        }
     
    }
    return(
        <>
        <div className="background">
            <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
            <div className="title">
            <Side/>
                <div className="content">
                    <h1 className="Title_label">Election Title:</h1>
                    <input type="text" id="title_holder" onChange={(e)=>{settitle(e.target.value)}}/>
                    <p id="error"></p>
                    <div className="title_button">
                        <Link to={'/home'} id="link">
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
            </div>
        </>
    )
}

export default Title