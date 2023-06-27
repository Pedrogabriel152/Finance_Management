import React, { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const {getAuthentication} = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuthentication();

        if(!auth || auth.code !== 200){
            navigate('/login');
        } 
    }, []);

    return (
        <h1>Home</h1>
    );
}

export default Home;