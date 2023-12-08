import React, { useEffect, useState } from "react";
import Side from "../side/side.jsx";
import '../styles/home.css'
import { Link } from "react-router-dom";
import axios from "axios"
require('dotenv').config();

const Home = () => {
    const [Title2, setTitle2] = useState([])
    let Useremail = window.sessionStorage.getItem('email')
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/auth/google/callback`)
    .then((res) => {
       console.log(res.data);
    })
    .catch((error) => {
        console.error('Error in Google authentication callback:', error);
    });
      }, []);

    useEffect(()=>{
        console.log("useEffect started");
    axios.get(`${process.env.REACT_APP_URL}/title/${Useremail}`)
    .then((res) => {
        console.log("Request successful");
        setTitle2(res.data);
    })
    .catch((error) => {
        console.error("Error in request:", error);
    });
    }, [Useremail])
    return(
        <>
        <div className="background">
        <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
            <div className="home">
                <Side/>
                    {/* <div className="home_search">
                        <input type="search" id="search"/>
                    </div>  */}
                    <div className="home_body">
                        <Link to={'/Add_new'}>
                            <div className="Add_new">
                                <p id="poll">Create A New Poll</p>
                                <p id="Add">+</p>
                            </div>
                        </Link>
                        {Array.isArray(Title2.data) && Title2.data.length > 0 ? (
                            Title2.data.map((title) => (
                                <Link to={`/position/${title.Useremail}/${title.Title}`} key={title._id}>
                                    <div className="Add_new">
                                        <p id="poll">{title.Title}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <h1>Add New Title</h1>
                        )}

                        
                    </div>
            </div>
            </div>
        </>
    )
}

export default Home