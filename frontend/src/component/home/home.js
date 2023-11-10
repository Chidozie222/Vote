import React, { useEffect, useState } from "react";
import Side from "../side/side";
import '../styles/home.css'
import { Link } from "react-router-dom";
import axios from "axios"

const Home = () => {
    const [Title2, setTitle2] = useState([])
    let Useremail = window.sessionStorage.getItem('email')
    useEffect(() => {
        axios.get('http://localhost:2000/auth/google/callback')
    .then((res) => {
       console.log(res.data);
    })
    .catch((error) => {
        console.error('Error in Google authentication callback:', error);
    });
      }, []);

    useEffect(()=>{
        console.log("useEffect started");
    axios.get(`http://localhost:2000/title/${Useremail}`)
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
            <Side/>
            <div className="home">
                <input type="search" id="search"/>
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
        </>
    )
}

export default Home