import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

    useEffect(()=>{
        axios.get(`http://localhost:2000/position_title/${Useremail}/${Title}`)
        .then((res)=> {
            setPosition(res.data.data) // replace yourArray with the correct key
        })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:2000/user_info/${_id}`)
        .then((res)=> {
            setUser_file(res.data)
        })
    },[])
    const catch_illegal_voter = async() => {
        let email = await User_file.data.email
        axios.get(`http://localhost:2000/remove/${Useremail}/${Title}/${email}`)
        .then((res)=> {
            let illegal_activities = res.data

            if (illegal_activities.status === 'ok') {
                alert(illegal_activities.message)
            } else {
                if (illegal_activities.status === 'pending') {
                    alert(illegal_activities.message)
                } else {
                    alert(illegal_activities.message)
                }
            }
        })
    }

    useEffect(()=> {
        catch_illegal_voter()
    })

    useEffect(()=>{
        Position.forEach(position => {
            axios.get(`http://localhost:2000/getcandidateinfo/${Useremail}/${Title}/${position.position}`)
            .then((res)=> {
                setcandidate(oldArray=>([...oldArray, ...res.data.data])) // replace yourArray with the correct key
            })
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
    console.log(_id);
    if (_id) {
        axios.get(`http://localhost:2000/candidate_id/${_id}`)
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
            fetch("http://localhost:2000/voter_for_candidate", {
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
                    <>
                    <p id="position" key={title._id}>
                        {title.candidateName}
                    </p>
                    <button type="button" onClick={() => voting_result(title._id)}>Vote</button>
                    </>
                ))}
            </>
        );
    }
}

const auth = async() => {
    let Name = await User_file.data.Name
    let email = await User_file.data.email
    let code = await User_file.data.code
    fetch("http://localhost:2000/voter_for_candidate", {
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
                    } else {
                        alert('error, please submit again')
                    }
                })
}
const auth_tocatch_thebadguy = () => {
    if (candidate.length > 0) {
        return (
            <>
                <button type="button" onClick={()=>auth}>submit</button>
            </>
        );
    }
}


// ...
    return(
        <>
            <div className="sider-form_positions">
            {Position.map((title) => (
               <p id="position">{title.position}</p>
            ))}
            </div>
            <div className="result_voting-section">
                <h1 id="result_Title">{Title}</h1>
                {project_impossible_part2()}
                {auth_tocatch_thebadguy()}
                {project_impossible()}
                {button()}
            </div>
        </>
    )
}

export default Voter_platform_vote
