import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Signup.css';
import image from '../images/default-avatar-profile-icon-vector-social-media-user-image-182145777.png'
require('dotenv').config();


const Signup = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")

    let navigate = useNavigate()
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const submit = (e) => {
        e.preventDefault();
        let username = document.getElementById('error')
        let useremail = document.getElementById('error1')
        let Password = document.getElementById('error2')
        let phone = document.getElementById('error3')

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
                    if (cpassword.trim().length === 0) {
                        phone.innerHTML = 'Please input your Phone Number'
                    } else {
                
                        fetch(`${process.env.REACT_APP_URL}/register`, {
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
                                PhoneNumber: cpassword,
                                password
                            }),
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.status === 'ok'){
                                    alert(data.message)
                                    window.sessionStorage.setItem('data1', data.data)
                                    navigate("/Signin")
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

let show = document.getElementById('showPassword')
    if (show) {
        document.getElementById('showPassword').addEventListener('click', ()=> {
            document.getElementById('password').type = "text"
            document.getElementById('hidePassword').style.display = "block"
            document.getElementById('showPassword').style.display = "none"
        })
    }

    let hide = document.getElementById('hidePassword')
    if (hide) {
        document.getElementById('hidePassword').addEventListener('click', () => {
            document.getElementById('password').type = "password"
            document.getElementById('hidePassword').style.display = "none"
            document.getElementById('showPassword').style.display = "block"
        })
    }


    return(
        <div className="background">
            <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
            <div className="sign-up">
                    <div className="siderbar">
                        <img src={image} alt="Sign Up" />
                        <h3>SIGN UP</h3>
                        <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in omnis praesentium, maxime perspiciatis non hic voluptate nihil fugit dignissimos ea asperiores, eius enim quibusdam at? Quam, doloribus minus? Vel."</p>
                    </div>
            
                        <div className="form_signup">
                            <nav>
                                <p>Already have a account?</p>
                                <Link to={'/Signin'}>
                                <button type="button" className="signup-button">SIGN IN</button>
                                </Link>
                            </nav>
                            <div className="form">
                                <h1>Create An Account Today</h1>
                            <form id="form">
                                <input type="text" placeholder="Full name" id="name" onChange={(e)=>{setname(e.target.value)}}/>
                                <p id="error"></p>
                                <input type="email" placeholder="Email" id="email" onChange={(e)=>{setemail(e.target.value)}}/>
                                <p id="error1"></p>
                                <input type="password" placeholder="Password" id="password" onChange={(e)=>{setpassword(e.target.value);}}/>
                                <div className="pass" id="showPassword">
                                <i class="fas fa-eye"></i>
                                </div>
                                <div className="pass" id="hidePassword">
                                <i class="fas fa-eye-slash"></i>
                                </div>
                                <p id="error2"></p>
                                <input type="tel" placeholder="Phone Number" id="c-password" onChange={(e)=>{setcpassword(e.target.value)}}/>
                                <p id="error3"></p>
                            </form>
                            <i class="fas fa-arrow-right"></i>
                            <button type="button" onClick={submit}>SIGN UP</button>
                            </div>
                            </div>
                            
    </div>
            </div>
    )
}

export default Signup



{/*
    
*/}