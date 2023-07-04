import React, { useEffect, useState } from "react";
import { FooteStyle, IconeFooterStyle } from "./style";
import { FaGithub, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
    const date = new Date();
    const [size, setSize] = useState<number>(500);

    useEffect(() => {
        const size = window.screen.width;
        
        if(size < 501) {
            setSize(25);
        }

        if(size > 501 && size < 1280) {
            setSize(50)
        }

    }, [size]);

    return (
        <FooteStyle>
            <p>Pedro Gabriel &copy; {date.getFullYear()} - Todos os direitos reservados.</p>
            <IconeFooterStyle>
                <a href=""><FaFacebook size={size} color="#FFF"/></a>
                <a href=""><FaInstagram size={size} color="#FFF"/></a>
                <a href=""><SiGmail size={size} color="#FFF"/></a>
                <a href=""><FaGithub size={size} color="#FFF"/></a>
            </IconeFooterStyle>
        </FooteStyle>
    );
}

export default Footer;