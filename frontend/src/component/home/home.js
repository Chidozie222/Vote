import React, { useEffect, useState } from "react";
import Side from "../side/side";
import '../styles/home.css'
import { Link } from "react-router-dom";
import axios from "axios"

const Home = () => {
    const [Title, setTitle] = useState("")
    let Useremail = window.sessionStorage.getItem('email')
    console.log(Useremail);
    useEffect(()=>{
        console.log("useEffect started");
    axios.get(`http://localhost:2000/title/${Useremail}`)
    .then((res) => {
        console.log("Request successful");
        setTitle(res.data);
    })
    .catch((error) => {
        console.error("Error in request:", error);
    });
    }, [Useremail])

    const title = (data) => {
        if (data.data) {
                    return(
                        <Link to={'/Add_new'}>
                        <div className="Add_new">
                            <p id="poll">{data.data[0].Title}</p>
                        </div>
                    </Link>
                    )
            }
    }
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
                    {title(Title)}
                </div>
            </div>
        </>
    )
}

export default Home