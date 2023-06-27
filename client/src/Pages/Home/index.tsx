import { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { HomeStyle } from "./style";

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
        <HomeStyle>
            <NavBar />
        </HomeStyle>
    );
}

export default Home;