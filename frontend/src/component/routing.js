import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './main'
import Signup from './authification/signup';
import Signin from './authification/signin';
import Verify from './authification/verify';
import Forget from './authification/forget';
import Home from './home/home';
import Title from './candidate_information/title';

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
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routing;