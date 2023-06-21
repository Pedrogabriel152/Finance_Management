import React from "react";
import { MediaSocialStyle } from "./style";

// Icons
import LogoLinkedin from "../../Assets/Icons/linkedin/icons8-linkedin-48.svg";
import LogoGmail from "../../Assets/Icons/icons8-gmail.svg";

const IconesRodape = () => {
    return (
        <MediaSocialStyle>
            <img src={LogoLinkedin} alt="Linkedin" />
            <img src={LogoGmail} alt="Gmail" />
        </MediaSocialStyle>
    );
}

export default IconesRodape;