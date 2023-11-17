import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/signin.css';
require('dotenv').config();


const Signin = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
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
                    sessionStorage.setItem('email', email)
                    if(password.trim().length === 0){
                        Password.innerText = 'Please input a password'
                    }else{
                        Password.innerText = ''
                        fetch(`${process.env.REACT_APP_URL}/login`, {
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
                                    window.sessionStorage.setItem('data', data.data)
                                    navigate("/home")
                                } else{
                                    alert(data.message)
                                }
                            })
                }
            }
        }
    }

    const google = async() => {
        const response = await fetch(`${process.env.REACT_APP_URL}/google`,
        {method: 'post'});
        const data = await response.json();
        window.location.assign(data.url);
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
                                <p id="text">Forgot your password?</p>
                                <Link to={'/forget'} id="forget_password">
                                    Click here
                                </Link>
                                <input type="button" value={"SIGN IN"} id="btn" onClick={submit}/>
                            </form>
                            <p className="text-wrapper">Sign in with Google accounts:</p> <button type="button" id="icon" onClick={google}><i class="fa-brands fa-google"></i></button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Signin