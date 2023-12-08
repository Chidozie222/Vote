import React, { useEffect, useState } from "react";
import Side from "../side/side.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/setting.css'
require('dotenv').config();

const Setting = () => {
    const [setting, setsetting] = useState("")

    let setting_email = window.sessionStorage.getItem('email_setting')
    const setting_function = () => {
        axios.post(`${process.env.REACT_APP_URL}/user`, {
            Useremail: setting_email
        })
        .then((res)=>setsetting(res.data))

        if(setting.status === 'ok') {
            return(
                <>
                <label id="Name">
                            Name:
                            </label>
                            <br/>
                            <input type="text" name="Name" id="Name_setting" value={setting.data.Username}/>
                            <label id="Email">
                            Email:
                            </label>
                            <br/>
                    <input type="email" name="Email" id="Email_setting" value={setting.data.Useremail} />
                    
                    
                    </>
            )
        }
    }
    useEffect(() => {
        const Profile_image = document.getElementById('add_setting');
        if (Profile_image) {
            Profile_image.addEventListener('click', () => {
                document.getElementById('image').click();
            });
    
            document.getElementById('image').addEventListener('change', (event) => {
                const photo = event.target.files[0];
    
                if (photo) {
                    const profile = new FormData();
                    profile.append('image', photo);
                    profile.append('Useremail', setting_email);
    
                    axios.post(`${process.env.REACT_APP_URL}/image-for_User_setting`, profile)
                        .then((res) => {
                            if (res.data.status === 'ok') {
                                alert(res.data.message);
                            } else {
                                alert(res.data.message);
                            }
                        })
                        .catch((error) => {
                            console.error("Error uploading image:", error);
                        });
                }
            });
        }
    }, [setting_email]);
    

    const photo_section = () => {
        if (setting.data?.photo) {
            return(
                <img src={`${process.env.REACT_APP_URL}/uploads/${setting.data.photo}`} alt={setting.data.Username} id="img_setting"/>
            )
        } else{
            return(
                <div id="image_setting">
                        <p id="add_setting">+</p>
                        <input type="file" name="file" id="image" />
                </div>
            )
        }
    }
    console.log(setting);
    return(
        <>
            <Side/>
            <div className="setting">
                <div className="setting_file">
                    <div id="form_for_setting">
                        {setting_function()}
                    </div>
                    {photo_section()}
                </div>
                <Link to={'/forget'} id="setting_link">
                    <p id="Link_setting">Edit Your Password</p>
                </Link>
            </div>
        </>
    )
}

export default Setting