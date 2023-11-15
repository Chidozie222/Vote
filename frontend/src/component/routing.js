import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './main'
import Signup from './authification/signup';
import Signin from './authification/signin';
import Verify from './authification/verify';
import Forget from './authification/forget';
import Home from './home/home';
import Title from './candidate_information/title';
import Position from './position/position';
import Position_form from './candidate_information/position';
import Candidate_information from './candidate_information/candidate';
import Voter from './voter-id/voter-id.jsx';
import Voter_preview from './voter-id/voter.jsx';
import Guest from './guest/guest-first_page.jsx';
import Guest_verify from './guest/guest-verify.jsx';
import Voting_plalform_signin from './voting_platform/voting.jsx';
import Voter_platform_vote from './voting_platform/voting_paltform.jsx';

const Routing = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main/>}>
                    <Route index element={<Signup/>}/>
                        <Route path='Signup' element={<Signup/>}/>
                        <Route path='/Signin' element= {<Signin/>}/>
                        <Route path='/verify' element= {<Verify/>}/>
                        <Route path='/home' element= {<Home/>}/>
                        <Route path='/forget' element= {<Forget/>}/>
                        <Route path='/Add_new' element= {<Title/>}/>
                        <Route path='/position/:Useremail/:Title' element= {<Position/>}/>
                        <Route path='/Add_new_position' element= {<Position_form/>}/>
                        <Route path='/candidate/:Useremail/:Title/:position' element= {<Candidate_information/>}/>
                        <Route path='/voter-id' element= {<Voter/>}/>
                        <Route path='/voter-id/preview_page/:Useremail' element= {<Voter_preview/>}/>
                        <Route path='/sent/:Useremail' element= {<Guest/>}/>
                        <Route path='/voterprofile/:Useremail' element= {<Guest_verify/>}/>
                        <Route  path='/voter_platform/:Title/:Useremail' element={<Voting_plalform_signin/>}/>
                        <Route path='/Voter_platform_vote-selection/:Title/:Useremail/:_id' element= {<Voter_platform_vote/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routing;