import React, { useState } from "react";
import '../styles/guest_verify.css'
import {  useNavigate, useParams } from "react-router-dom";
import Setup_for_voting from "../step_for_voting/steps_for_voting"
require('dotenv').config();



const Guest_verify = () => {
    let params = useParams()
    let Useremail = params.Useremail
    let Title = params.Title
    let navigate = useNavigate()
    const [otp, setotp] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Name, setName] = useState("")
    let email = window.sessionStorage.getItem('file')
    const guest_verify = () => {
        let  useremail= document.getElementById('error')
        let lotp = document.getElementById('error1')
        let Password = document.getElementById('error2')
        let username = document.getElementById('err')

        if (Name.trim().length === 0) {
            username.innerText = 'input a name'
        } else {
            if (email.trim().length === 0) {
                useremail.innerText = 'input a vaild email'
            } else {
                useremail.innerText = ''
                if (email.match("^([a-zA-Z0-9]+)@gmail.com")===null) {
                    useremail.innerText = 'This is how your email should be like example@gmail.com'
                } else{
                    if (otp.trim().length === 0) {
                        lotp.innerText = "Please input a vaild otp"
                    } else {
                        if (PhoneNumber.trim().length === 0) {
                            Password.innerText = "Please input your Phone Number"
                        } else {
                                fetch(`${process.env.REACT_APP_URL}/verifyotp`, {
                            method: "POST",
                            crossDomain: true,
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                                Name,
                                email,
                                otp,
                                PhoneNumber,
                                Useremail
                            }),
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.status === 'ok'){
                                    alert(data.message)
                                    navigate(`/voter_platform/${Title}/${Useremail}`)
                                } else{
                                    alert(data.message)
                                }
                            })
                        }
                    }
                }
            }
        }
    }

    const sent_otp = (e) => {
        e.preventDefault();
        let useremail = document.getElementById('error')
        let mail = email
        if (mail==="") {
            useremail.innerText= 'please input your email'
        } else {
            fetch(`${process.env.REACT_APP_URL}/sendotp`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                     email,
                }),
                })
                .then(res => res.json())
                .then(data=> {
                    if (data.status === 'ok') {
                        alert(data.message)
                    } else {
                        alert(data.message)
                    }
                }) 
        }
    }
    return(
        <div className="background">
            <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
                 <div className="guest_verify_form">
                    <div className="side">
                        <Setup_for_voting/>
                    </div>
                    <div className="container">
                        <h1></h1>
                        {/* <form> */}
                            {/* <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} id="cnpassword"/> */}
                            {/* <p id="err"></p> */}
                            {/* <input type="text" value={email}/> */}
                            {/* <p id="error"></p> */}
                            {/* <input type="tel" placeholder="OTP" onChange={(e)=>{setotp(e.target.value)}}/> */}
                            {/* <p id="error1"></p> */}
                            {/* <input type="tel" placeholder="Phone Number" onChange={(e)=>{setPhoneNumber(e.target.value)}} id="npassword"/> */}
                            {/* <p id="error2"></p> */}
                            {/* <input type="btn" value={"Verify"} id="verify_button" onClick={guest_verify}/> */}
                            {/* <p id="resend">your otp code will expire after 2mins,  */}
                            {/* <br/>click here to resend the otp</p> */}
                            {/* <br/> */}
                            {/* <button type="btn" id="resend_button" onClick={sent_otp}>resend</button> */}
                        {/* </form> */}
                    </div>
                 </div> 
        </div>
    )
} 


export default Guest_verify;