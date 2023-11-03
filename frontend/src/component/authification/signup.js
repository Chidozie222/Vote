import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import './Signup.css';


const Signup = () => {
    return(
        <>
            <div className="sign-in">
                <div className="overlap-wrapper">
                    <div className="overlap">
                        <div className="div">
                            <div className="center">
                                <div className="text-wrapper-2">Hi, do you already have an accout?</div>
                                <button type="button" className="login-button">SIGN IN NOW<span class="signup-text"> SIGN IN NOW</span></button>
                                </div>
                        </div>
                        <div className="form">
                            <form id="form">
                                <input type="text" placeholder="Full name" id="name"/>
                                <input type="email" placeholder="Email" id="email"/>
                                <input type="password" placeholder="Password" id="password"/>
                                <input type="password" placeholder="Confirm password" id="c-password"/>
                                <input type="button" value={"SIGN UP"} id="btn"/>
                            </form>
                            <p className="text-wrapper">Sign up with other accounts:</p><FaGoogle id="icon"/><FaFacebook id="icon"/>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Signup