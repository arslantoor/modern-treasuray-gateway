import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import FooterBar from "./FooterBar";

const Layout = () => {
    useEffect((e) => {
        let moveTop = document.getElementById("scrollTop")
        moveTop.addEventListener("click", function () {
            window.scrollTo(0, 0);
            console.log("hey")
        })
    }, [0])
    return (
        <React.Fragment>
            <main className="hp-bg-color-dark-90 d-flex min-vh-100">
                <SideNav/>
                <div className="hp-main-layout">
                    <TopNav/>
                    <Outlet/>
                    <FooterBar/>
                </div>

            </main>
            <div className="scroll-to-top">
                <button type="button" className="btn btn-primary btn-icon-only rounded-circle hp-primary-shadow"
                        id="scrollTop">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16px"
                         width="16px" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                                d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z"></path>
                        </g>
                    </svg>
                </button>
            </div>

        </React.Fragment>
    )
}

export default Layout
