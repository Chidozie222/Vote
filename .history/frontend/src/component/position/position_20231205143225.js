import React, { useEffect, useState } from "react";
import axios from "axios"
import { useParams, Link } from 'react-router-dom';
import Side from "../side/side.jsx";
import '../styles/home.css';
require('dotenv').config();

const Position = () => {
    let params = useParams();
    let Useremail = params.Useremail
    let Title = params.Title
    const [position, setposition] = useState("")

    useEffect(()=>{
        window.sessionStorage.setItem('title', Title)
        window.sessionStorage.setItem('Useremail', Useremail)
        axios.get(`${process.env.REACT_APP_URL}/position_title/${Useremail}/${Title}`)
        .then((res)=> {
            setposition(res.data)
        })
    })
    const font = () => {
        let request = document.getElementById('link_message')
        request.innerText = `http://localhost:3000/sent/${Title}/${Useremail}`
    }
    const pos = (data) => {
        if (data.data) {
            return(
                <>
                <center><p id="link_message"></p></center>
                <button className="flash" onClick={font}>Generate Voter platform Link</button>
                <Link to={'/voter-id'} id="link_of-link">
                    <button type="button" id="pos-btn">Submit</button>
                </Link>
                </>
            )
        }
    }
    return(
        <>
        <Side/>
        <div className="home">
        <h1 id="Position_title">{Title}</h1>
                <div className="home_body">
                    <Link to={'/Add_new_position'}>
                        <div className="Add_new">
                            <p id="poll">Create A New Position</p>
                            <p id="Add">+</p>
                        </div>
                    </Link>
                    {Array.isArray(position.data) && position.data.length > 0 ? (
                        position.data.map((title) => (
                            <Link to={`/candidate/${title.Useremail}/${title.Title}/${title.position}`} key={title._id}>
                                <div className="Add_new">
                                    <p id="poll">{title.position}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                       <h1 id="world">Add New Title</h1> 
                    )}
                    {pos(position)}
                </div>
            </div>
        </>
    )
}

export default Position