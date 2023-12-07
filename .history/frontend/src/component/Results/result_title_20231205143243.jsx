import React, { useEffect, useState } from "react";
import Side from "../side/side.jsx";
import '../styles/home.css'
import { Link } from "react-router-dom";
import axios from "axios"
require('dotenv').config();

const Result_title = () => {
    const [Title2, setTitle2] = useState([])
    let Useremail = window.sessionStorage.getItem('email')
    useEffect(()=>{
    axios.get(`${process.env.REACT_APP_URL}/title/${Useremail}`)
    .then((res) => {
        setTitle2(res.data);
    })
    }, [Useremail])
    return(
        <>
            <Side/>
            <div className="home">
                <div className="home_body">
                    {Array.isArray(Title2.data) && Title2.data.length > 0 ? (
                        Title2.data.map((title) => (
                            <Link to={`/Results/${title.Useremail}/${title.Title}`} key={title._id}>
                                <div className="Add_new">
                                    <p id="poll">{title.Title}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <h1>Waiting the title for result</h1>
                    )}

                    
                </div>
            </div>
        </>
    )
}

export default Result_title