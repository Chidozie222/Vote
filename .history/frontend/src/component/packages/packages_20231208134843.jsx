import React, { useEffect, useState } from "react";
import Side from "../side/side.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/setting.css'
require('dotenv').config();

const Setting = () => {
    return(
                    <div className="background">
        <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
            <div className="setting">
                <Side />
                
            </div>
            </div>
    )
}

export default Setting