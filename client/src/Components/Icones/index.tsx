import React from "react";
import { MediaSocialStyle } from "./style";

// Icons
import LogoLinkedin from "../../Assets/Icons/linkedin/icons8-linkedin-48.svg";
import LogoGmail from "../../Assets/Icons/icons8-gmail.svg";
import LogoGitHub from "../../Assets/Icons/github/icons8-github.svg";

const IconesRodape = () => {
    return (
        <MediaSocialStyle>
            <a href="https://github.com/Pedrogabriel152/Finance_Management">
                <img src={LogoGitHub} alt="gitHub" />
            </a>
            <a href="https://www.linkedin.com/in/pedro-gabriel-a38726223/">
                <img src={LogoLinkedin} alt="Linkedin" />
            </a>
            <a href="pedrpg5@gmail.com">
                <img src={LogoGmail} alt="Gmail" />
            </a>
        </MediaSocialStyle>
    );
}

export default IconesRodape;