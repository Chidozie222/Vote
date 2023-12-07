import React, { useState } from "react";
import '../styles/side.css'
import { Link, useNavigate } from "react-router-dom";
import image from'../images/default-avatar-profile-icon-vector-social-media-user-image-182145777.png';
require('dotenv').config();

const Side = () => {
    const [Userdata, setUserdata] = useState("");
    const [activeLink, setActiveLink] = useState(null);
    let navigate = useNavigate()
    const side = (data) => {
        let datas = window.sessionStorage.getItem('data')
        let data1 = window.sessionStorage.getItem('data1')
        if (datas === '') {
            if (data1 === '') {
                navigate('/Signup')
            } else {
                fetch(`${process.env.REACT_APP_URL}/user`, {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        Useremail: data1,
                    }),
                })
                .then(res=> res.json())
                .then(data=>{
                    setUserdata(data.data)
                })
            }
        } else {
            window.sessionStorage.setItem('email_setting', datas)
            fetch(`${process.env.REACT_APP_URL}/user`, {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        Useremail: datas,
                    }),
                })
                .then(res=> res.json())
                .then(data=>{
                    setUserdata(data.data)
                })
        }

        console.log(data);
        if (data) {
            window.sessionStorage.setItem('email', data.Useremail)
            if (data?.photo) {
                    return(
                        <>
                        <div className="profile">
                        <p id="user_name">{data.Username}</p>
                        <img src={`${process.env.REACT_APP_URL}/uploads/${data.photo}`} id="img"/>
                        </div>
                        <p id="Admin">Admin</p>
                        </>
                    )
            } else{
                return(
                    <>
                    <div className="profile">
                    <p id="user_name">{data.Username}</p>
                        <img src={image} id="img"/>
                        </div>
                        <p id="Admin">Admin</p>
                    </>
                )
            }
        }
    }
    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
      };
    return(
        <>
            <div className="div">
                in
            {side(Userdata)}
        <Link to={'/home'} onClick={() => handleLinkClick('dashboard')} className={activeLink === 'dashboard' ? 'active' : ''}>
          Dashboard
        </Link>
        <Link to={'/results'} onClick={() => handleLinkClick('results')} className={activeLink === 'results' ? 'active' : ''}>
          Results
        </Link>
        <Link to={'/packages'} onClick={() => handleLinkClick('packages')} className={activeLink === 'packages' ? 'active' : ''}>
          Packages
        </Link>
        <Link to={'/voter-id'} onClick={() => handleLinkClick('voter-id')} className={activeLink === 'voter-id' ? 'active' : ''}>
          Voter ID
        </Link>
        <Link to={'/settings'} onClick={() => handleLinkClick('settings')} className={activeLink === 'settings' ? 'active' : ''}>
          Settings
        </Link>
            </div>
        </>
    )
}


export default Side;