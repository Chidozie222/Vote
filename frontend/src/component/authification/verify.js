import React, { useState } from "react";
import '../styles/verify.css'
import { useNavigate } from "react-router-dom";
require('dotenv').config();



const Verify = () => {
    const [email, setemail] = useState("")
    const [otp, setotp] = useState("")
    const [npassword, setnpassword] = useState("")
    const [cnpassword, setcnpassword] = useState("")

    let navigate = useNavigate()

    const verify = (e) => {
        e.preventDefault();
        let  useremail= document.getElementById('error')
        let lotp = document.getElementById('error1')
        let Password = document.getElementById('error2')

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
                        if (npassword.trim().length === 0) {
                            Password.innerText = "Please input your new password"
                        } else {
                            if (npassword === cnpassword) {
                                fetch(`${process.env.REACT_APP_URL}/verifypassword`, {
                            method: "POST",
                            crossDomain: true,
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                                Useremail: email,
                                otp,
                                password: npassword
                            }),
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.status === 'ok'){
                                    alert(data.message)
                                    navigate("/Signin")
                                } else{
                                    alert(data.message)
                                }
                            })
                            } else {
                                Password.innerText = 'Passwords does not match each other'
                            }
                        }
                    }
                }
            }
    }

    const forgot = (e) => {
        e.preventDefault();
        let useremail = document.getElementById('error')
        let mail = email
        if (mail==="") {
            useremail.innerText= 'please input your email'
        } else {
            fetch(`${process.env.REACT_APP_URL}/fogetpassword`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    Useremail: mail,
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
        <>
            <div className="verify">
                <div className="verify_form">
                    <div className="background_gradient">
                        <form>
                            <input type="text" placeholder="email" onChange={(e)=>{setemail(e.target.value)}}/>
                            <p id="error"></p>
                            <input type="tel" placeholder="OTP" onChange={(e)=>{setotp(e.target.value)}}/>
                            <p id="error1"></p>
                            <input type="password" placeholder="new password" onChange={(e)=>{setnpassword(e.target.value)}} id="npassword"/>
                            <p id="error2"></p>
                            <input type="password" placeholder="comfirm new password" onChange={(e)=>{setcnpassword(e.target.value)}} id="cnpassword"/>
                            <p id="error2"></p>
                            <input type="btn" value={"Verify"} id="verify_button" onClick={verify}/>
                            <p id="resend">your otp code will expire after 2mins, 
                            <br/>click here to resend the otp</p>
                            <br/>
                            <button type="btn" id="resend_button" onClick={forgot}>resend</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
} 


export default Verify