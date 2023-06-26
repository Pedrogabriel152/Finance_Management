import React, { useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const {authentication} = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!authentication){
            navigate('/login');
        }
    }, [authentication]);

    return (
        <h1>Home</h1>
    );
}

export default Home;