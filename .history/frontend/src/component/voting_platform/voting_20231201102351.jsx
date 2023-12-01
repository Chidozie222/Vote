import React, {useState} from "react";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/voting.css';
require('dotenv').config();




const Voting_plalform_signin = () => {
    let params = useParams()
    let Useremail = params.Useremail
    let Title = params.Title
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
                    sessionStorage.setItem('file_email', email)
                    if(password.trim().length === 0){
                        Password.innerText = 'Please input a code or Phone Number'
                    }else{
                        Password.innerText = ''
                        fetch(`${process.env.REACT_APP_URL}/voter_platform-login`, {
                            method: "POST",
                            crossDomain: true,
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                                email,
                                code: password,
                                Useremail
                            }),
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.status === 'ok'){
                                    alert(data.message)
                                    navigate(`/Voter_platform_vote-selection/${Title}/${Useremail}/${data.data[0]._id}`)
                                } else{
                                    alert(data.message)
                                }
                            })
                }
            }
        }
    }


    return(
        <>
            <div className="Voting-platform_sign-in">
                <div className="voting_sign-in">
                    <div className="voting_overlap">
                        <div className="voting_form">
                            <form id="form">
                                <input type="email" placeholder="Email" id="email" onChange={(e)=>{setemail(e.target.value)}}/>
                                <p id="error1"></p>
                                <input type="tel" placeholder="Code or Phone Number" id="password" onChange={(e)=>{setpassword(e.target.value)}}/>
                                <p id="error2"></p>
                                <button type="submit">Validate Your Identity</button>
                            </form>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Voting_plalform_signin