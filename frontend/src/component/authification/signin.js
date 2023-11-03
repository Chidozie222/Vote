import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import './signin.css';


const Signin = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const submit = (e) => {
        e.preventDefault();
        let useremail = document.getElementById('error1')
        let Password = document.getElementById('error2')

            if (email.trim().length === 0) {
                useremail.innerText = 'input a vaild email'
            } else {
                useremail.innerText = ''
                if (email.match("^([a-zA-Z0-9]+)@gmail.com")===null) {
                    useremail.innerText = 'This is how your email should be like example@gmail.com'
                } else{
                    if(password.trim().length === 0){
                        Password.innerText = 'Please input a password'
                    }else{
                        Password.innerText = ''
                        fetch("http://localhost:2000/login", {
                            method: "POST",
                            crossDomain: true,
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                                Useremail: email,
                                password
                            }),
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.status === 'ok'){
                                    alert(data.message)
                                } else{
                                    alert(data.message)
                                }
                            })
                }
            }
        }
    }

    const google = () => {
        window.open(
            'http://localhost:2000/google',
            "_self"
        )
    }

    return(
        <>
            <div className="sign-in">
                <div className="overlap-wrapper">
                    <div className="overlap">
                        <div className="div">
                            <div className="center">
                                <div className="text-wrapper-2">Hi, to create an account</div>
                                <Link to={'/'}>
                                <button type="button" className="login-button">SIGN UP NOW<span class="signup-text"> SIGN UP NOW</span></button>
                                </Link>
                                </div>
                        </div>
                        <div className="form">
                            <form id="form">
                                <input type="email" placeholder="Email" id="email" onChange={(e)=>{setemail(e.target.value)}}/>
                                <p id="error1"></p>
                                <input type="password" placeholder="Password" id="password" onChange={(e)=>{setpassword(e.target.value)}}/>
                                <p id="error2"></p>
                                <input type="button" value={"SIGN IN"} id="btn" onClick={submit}/>
                            </form>
                            <p className="text-wrapper">Sign in with Google accounts:</p> <button type="button" id="icon" onClick={google}>Google</button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Signin