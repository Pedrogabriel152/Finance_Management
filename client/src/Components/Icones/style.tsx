import styled from "styled-components";

export const MediaSocialStyle = styled.div`
    

    @media screen {
        height: 8vh;
        display: flex;
        justify-content: space-between;
        margin: 50px;
        align-items: center;

        a{
            height: 100%;
        }
    }

    @media (min-width: 501px){
        background-color: #FFF;
        height: 10vh;
        a#singin{
            display: none;
        }
    }
`;