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
                    .then(res => res.json())
                    .then(data => {
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
                .then(res => res.json())
                .then(data => {
                    setUserdata(data.data)
                })
        }

        if (data) {
            window.sessionStorage.setItem('email', data.Useremail)
            if (data?.photo) {
                return (
                    <div className="profile">
                            <div>
                                <p id="user_name">{data.Username}</p>
                                <Link to={/>}>
                                <p id="Admin">Logout</p>
                                </Link>
                            </div>
                            <img src={`${process.env.REACT_APP_URL}/uploads/${data.photo}`} id="img" />
                        </div>
                )
            } else {
                return (
                        <div className="profile">
                            <div>
                                <p id="user_name">{data.Username}</p>
                                <Link to={/}>
                                <p id="Admin">Logout</p>
                                </Link>
                            </div>
                            <img src={image} id="img" />
                        </div>
                )
            }
        }
    }
    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
    };
    return (
        <>
            {/* <input type="checkbox" name="checkbox" id="checkbox" /> */}
            <div className="div">
                {side(Userdata)}
                <div className="side_div">
                    <Link to={'/home'} onClick={() => handleLinkClick('dashboard')} className={activeLink === 'dashboard' ? 'active' : ''}>
                        <i className="fas fa-home"></i><span>Dashboard</span>
                    </Link>
                    <Link to={'/results'} onClick={() => handleLinkClick('results')} className={activeLink === 'results' ? 'active' : ''}>
                        <i className="fas fa-poll-h"></i><span>Results</span>
                    </Link>
                    <Link to={'/packages'} onClick={() => handleLinkClick('packages')} className={activeLink === 'packages' ? 'active' : ''}>
                        <i className="fas fa-archive"></i><span>Packages</span>
                    </Link>
                    <Link to={'/voter-id'} onClick={() => handleLinkClick('voter-id')} className={activeLink === 'voter-id' ? 'active' : ''}>
                        <i className="fas fa-id-card"></i><span>Voter ID</span>
                </Link>
                    <Link to={'/settings'} onClick={() => handleLinkClick('settings')} className={activeLink === 'settings' ? 'active' : ''}>
                        <i className="fas fa-user-cog"></i><span>Settings</span>
                    </Link>
                    <label htmlFor="checkbox">
                        <i className="fas fa-bars" id="sidebar_btn"></i>
                    </label>
                </div>
            </div>
        </>
    );
}


export default Side;