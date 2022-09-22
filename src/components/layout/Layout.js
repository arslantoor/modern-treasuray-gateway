import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import TopNav from "./TopNav";

const Layout = () => {
    return (
        <main>
            <TopNav/>
            <Outlet/>
            {/*<FooterBar/>*/}
        </main>
    )
}

export default Layout
