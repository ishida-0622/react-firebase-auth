import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../sign_up/SignUp';
import SignIn from '../sign_in/SignIn';
import Home from '../home/Home';
import MyPage from '../mypage/MyPage';
import NotFound from '../not_found/NotFound';



const RouteConfig = () => {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}></Route>
                <Route path='signup' element={<SignUp/>}></Route>
                <Route path='signin' element={<SignIn/>}></Route>
                <Route path='mypage' element={<MyPage/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default RouteConfig
