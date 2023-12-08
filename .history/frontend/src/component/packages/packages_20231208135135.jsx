import React from "react";
import Side from "../side/side.jsx";
import '../styles/setting.css'
require('dotenv').config();

const Packages = () => {
    return(
                    <div className="background">
        <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
            <div className="packages">
                <Side />
                <h1>Comming Soon</h1>
            </div>
            </div>
    )
}

export default Packages