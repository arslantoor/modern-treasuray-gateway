import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthProvider';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <div>
            <ToastContainer/>
        </div>
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    </React.Fragment>,
);
reportWebVitals();