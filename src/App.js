import './App.css';
import React from "react";
import HomePage from "./components/HomePage";
import {Route, Routes} from 'react-router-dom';
import RequireAuth from "./auth/RequireAuth";
import LoginComponent from "./auth";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
        <Routes>

            {/* public routes */}
            <Route exact path="/login" element={<LoginComponent/>}/>
            {/* we want to protect these routes */}
            <Route path="/">
                <Route element={<RequireAuth/>}>
                    <Route exact path="/" element={<HomePage/>}/>
                </Route>

            </Route>
            {/**/}
        </Routes>)
}

export default App;