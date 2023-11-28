import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../images/default-avatar-profile-icon-vector-social-media-user-image-182145777.png'
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
        <>
        <div className="background">
        <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
            <div className="sign-in">
                <div className="siderbar">
                <img src={image} alt="Sign In" />
                        <h3>SIGN IN</h3>
                        <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in omnis praesentium, maxime perspiciatis non hic voluptate nihil fugit dignissimos ea asperiores, eius enim quibusdam at? Quam, doloribus minus? Vel."</p>
                </div>
                <div className="form_signin">
                    <nav>
                <p>Already have a account?</p>
                                <Link to={'/'}>
                                <button type="button" className="login-button">SIGN UP</button>
                                </Link>
                                </nav>
                        <div className="form">
                        <h1>SIGN IN TO ENJOY OUR SERVC</h1>
                            <form id="form">
                                <input type="email" placeholder="Email" id="email" onChange={(e)=>{setemail(e.target.value)}}/>
                                <div className="pass" id="showPassword">
                                <i class="fas fa-eye"></i>
                                </div>
                                <div className="pass" id="hidePassword">
                                <i class="fas fa-eye-slash"></i>
                                </div>
                                <p id="error1"></p>
                                <input type="password" placeholder="Password" id="password" onChange={(e)=>{setpassword(e.target.value)}}/>
                                <p id="error2"></p>
                                <div className="link">
                                <p id="text">Forgot your password?</p>
                                <Link to={'/forget'} id="forget_password">
                                    Click here
                                </Link>
                                </div>
                                <button type="submit" onClick={submit}>SIGN IN</button>
                            </form>
                            
    </div>
    </div>
                    </div>
                    </div>
        </>
    )
}


export default Signin