import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Signup.css';

const Signup = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")

    let navigate = useNavigate()
    const submit = (e) => {
        e.preventDefault();
        let username = document.getElementById('error')
        let useremail = document.getElementById('error1')
        let Password = document.getElementById('error2')

        if (name.trim().length === 0) {
            username.innerText = 'input a name'
        } else {
            username.innerText = ''
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
                    if (password === cpassword) {
                        Password.innerText = ''
                        fetch("http://localhost:2000/register", {
                            method: "POST",
                            crossDomain: true,
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                                Username: name,
                                Useremail: email,
                                password
                            }),
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.status === 'ok'){
                                    alert(data.message)
                                    window.sessionStorage.setItem('data1', data.data)
                                    navigate("/home")
                                } else{
                                    alert(data.message)
                                }
                            })
                    } else {
                        Password.innerHTML = 'Passwords does not match each other'
                    }
                }
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
                                <div className="text-wrapper-2">Hi, do you already have an accout?</div>
                                <Link to={'/Signin'}>
                                <button type="button" className="login-button">SIGN IN NOW<span class="signup-text"> SIGN IN NOW</span></button>
                                </Link>
                                </div>
                        </div>
                        <div className="form">
                            <form id="form">
                                <input type="text" placeholder="Full name" id="name" onChange={(e)=>{setname(e.target.value)}}/>
                                <p id="error"></p>
                                <input type="email" placeholder="Email" id="email" onChange={(e)=>{setemail(e.target.value)}}/>
                                <p id="error1"></p>
                                <input type="password" placeholder="Password" id="password" onChange={(e)=>{setpassword(e.target.value)}}/>
                                <p id="error2"></p>
                                <input type="password" placeholder="Confirm password" id="c-password" onChange={(e)=>{setcpassword(e.target.value)}}/>
                                <p id="error2"></p>
                                <input type="button" value={"SIGN UP"} id="btn1" onClick={submit}/>
                            </form>
                            <p className="text-wrapper">Sign up with Google accounts:</p> <button type="button" id="icon" onClick={google}>
                                <img src={process.env.PUBLIC_URL + './google.png'}/>
                            </button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Signup