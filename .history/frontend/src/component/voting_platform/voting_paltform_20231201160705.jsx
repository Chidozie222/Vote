import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../styles/voter_platform.css'
import Setup_for_voting from "../step_for_voting/steps_for_voting";
require('dotenv').config();

const Voter_platform_vote = () => {
    let params = useParams()
    let Useremail = params.Useremail
    let Title = params.Title
    let _id = params._id
    const [Position, setPosition] = useState([])
    const [User_file, setUser_file] = useState("")
    const [candidate, setcandidate] = useState([])
    const [page, setPage] = useState(1)
    const [result, setresult] = useState("")
    let navigate = useNavigate()
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/position_title/${Useremail}/${Title}`)
        .then((res)=> {
            setPosition(res.data.data) // replace yourArray with the correct key
        })
    },[Useremail, Title])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/user_info/${_id}`)
        .then((res)=> {
            setUser_file(res.data)
        })
    },[_id])
    const catch_illegal_voter = async() => {
        if (User_file.status === 'ok') {
            let email = User_file.data.email;
        axios.get(`${process.env.REACT_APP_URL}/remove/${Useremail}/${Title}/${email}`)
        .then((res)=> {
            let illegal_activities = res.data

            if (illegal_activities.status === 'ok') {
                alert(illegal_activities.message)
                navigate('/finish')
            } else {
                if (illegal_activities.status === 'pending') {
                } else {
                    alert(illegal_activities.message)
                }
            }
        })
        }
    }

    useEffect(()=> {
        catch_illegal_voter()
    })

    useEffect(()=>{
        Position.forEach(position => {
            if (position.position) {
                axios.get(`${process.env.REACT_APP_URL}/getcandidateinfo/${Useremail}/${Title}/${position.position}`)
                .then((res)=> {
                    if (res.data.status === 'ok') {
                        setcandidate(oldArray=>([...oldArray, ...res.data.data])) // replace yourArray with the correct key
                    }
                })
            }
        })
    },[Position])

   // ...

const project_impossible = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(candidate.length / 3) && selectedPage !== page) {
        setPage(selectedPage);
    }
}

// ...

const button = () => {
    if (candidate.length > 0) {
        return (
            <button type="button" id="mission_impossible_dead-button" onClick={() => project_impossible(page + 1)}>
                Next
            </button>
        );
    }
}

// ...
const voting_result = async(_id) => {
    if (_id) {
        axios.get(`${process.env.REACT_APP_URL}/candidate_id/${_id}`)
        .then((res)=> {
            setresult(res.data)
        })

        if (result.status === 'ok') {
            let candidateName = await result.data.candidateName
            let position = await result.data.position
            let Title = await result.data.Title
            let Useremail = await result.data.Useremail
            let Name = await User_file.data.Name
            let email = await User_file.data.email
            let image = await result.data.image
            fetch(`${process.env.REACT_APP_URL}/voter_for_candidate`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    candidateName,
                    position,
                    Name,
                    image,
                    email,
                    Title,
                    Useremail
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



const project_impossible_part2 = () => {
    if (candidate.length > 0) {
        return (
            <>
                {candidate.slice((page - 1) * 3, page * 3).map((title) => (
                    <React.Fragment key={title._id}>
                        <div className="col-sm-6">
                        <img src={`${process.env.REACT_APP_URL}/uploads/${title.image}`} alt={title.candidateName} id="candidate_img-for_voting"/>
                        <p id="position">{title.candidateName}</p>
                        <p className="voter-candidate">{title.position}</p>
                        <button type="button" onClick={() => voting_result(title._id)} id="voter_btn">Vote</button>
                        </div>
                    </React.Fragment>
                ))}

            </>
        );
    }
}

const auth = async() => {
    let Name = await User_file.data.Name
    let email = await User_file.data.email
    let code = await User_file.data.code
    fetch(`${process.env.REACT_APP_URL}/remove`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    Name,
                    email,
                    code,
                    Title,
                    Useremail
                }),
                })
                .then(res => res.json())
                .then(data=>{
                    if (data.status === 'ok') {
                        alert('done')
                        navigate('/finish')
                    } else {
                        alert('error, please submit again')
                    }
                })
}
const auth_tocatch_thebadguy = () => {
    if (candidate.length > 0) {
        return (
            <>
                <button type="button" onClick={()=> auth()}  id="voter_submit-button">submit</button>
            </>
        );
    }
}


// ...
    return(
        <div className="background">
            <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourth"></div>
            <div className="fifth"></div>
            <div className="sixth"></div>
                <div className="voting_paltform">
                {Position.map((title) => (
                <p id="position_for-sider" key={title._id}>{title.position}</p>
                ))}
                    <h1 id="result_Title">{Title}</h1>
                    {project_impossible_part2()}
                    {auth_tocatch_thebadguy()}
                    {project_impossible()}
                    {button()}
                    </div>
            </div>
    )
}

export default Voter_platform_vote;
