import './App.css';
import React from "react";
import HomePage from "./components/HomePage";
import {Route, Routes} from 'react-router-dom';
import RequireAuth from "./auth/RequireAuth";
import LoginComponent from "./auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterParty from "./components/CounterParty";
import MakePayment from "./components/MakePayment";
import Layout from "./components/layout/Layout";
import AddInternalAccount from "./components/AddInternalAccounts";
import AddExternalAccount from "./components/AddExternalAccount";
function App() {
    return (
        <Routes>

            {/* public routes */}
            <Route exact path="/login" element={<LoginComponent/>}/>
            {/* we want to protect these routes */}
            <Route path="/"  element={<Layout/>}>
                <Route element={<RequireAuth/>}>
                    <Route exact path="/" element={<HomePage/>}/>
                </Route>
                <Route element={<RequireAuth/>}>
                    <Route exact path="/counter-party-transaction" element={<CounterParty/>}/>
                </Route>
                <Route element={<RequireAuth/>}>
                    <Route exact path="/make-payment" element={<MakePayment/>}/>
                </Route>
                <Route element={<RequireAuth/>}>
                    <Route exact path="/add-internal-account" element={<AddInternalAccount/>}/>
                </Route>
                <Route element={<RequireAuth/>}>
                    <Route exact path="/add-external-account" element={<AddExternalAccount/>}/>
                </Route>

            </Route>
            {/**/}
        </Routes>)
}

export default App;