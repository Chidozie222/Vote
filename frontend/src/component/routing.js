import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './main'
import Signup from './authification/signup';
import Signin from './authification/signin';

const Routing = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main/>}>
                    <Route index element={<Signup/>}/>
                        <Route path='Signup' element={<Signup/>}/>
                        <Route path='/Signin' element= {<Signin/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routing;