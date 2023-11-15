import React, { useState } from "react";
import '../styles/forget.css';
import { useNavigate, useParams } from "react-router-dom";


const Guest = () => {
    const [email, setemail] = useState("")

    let params = useParams()
    let Useremail = params.Useremail
    let navigate = useNavigate()

    const forgot = (e) => {
        e.preventDefault();
        let useremail = document.getElementById('error')
        let mail = email
        window.sessionStorage.setItem('file', email)
        if (mail==="") {
            useremail.innerText= 'please input your email'
        } else {
            fetch('http://localhost:2000/sendotp', {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                     email: mail,
                }),
                })
                .then(res => res.json())
                .then(data=> {
                    if (data.status === 'ok') {
                        alert(data.message)
                        navigate(`/voterprofile/${Useremail}`)
                    } else {
                        alert(data.message)
                    }
                }) 
        }
       
    }


    return(
        <>
             <div className="forget">
                <div className="forget_form">
                    <div className="background_forget_gradient">
                        <form>
                            <input type="text" placeholder="Email" onChange={(e)=>{setemail(e.target.value)}} id="input"/>
                            <p id="error"></p>
                            <button type="btn" id="forget_button" onClick={forgot}>Send OTP</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Guest