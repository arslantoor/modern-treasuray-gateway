import {useLocation, Navigate, Outlet} from "react-router-dom";

const RequireAuth = () => {
    const location = useLocation();
    let newToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInNjb3BlcyI6W10sImlkIjo3NSwiZXhwIjoxNjYwNjQwMTc5fQ.TTag_qxgVYNeJZBocKudvs14wFMtrTPudQt_nf5ytn8";
    localStorage.setItem("token", newToken);
    const token = localStorage.getItem('token')
    return (
        token
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    );
}

export default RequireAuth;