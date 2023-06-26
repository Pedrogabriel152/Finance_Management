import styled from "styled-components";

export const MediaSocialStyle = styled.div`
    @media (max-width: 500px) {
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
        background-color: #E6E6E6;
        position: absolute;
        display: flex;
        justify-content: space-between;
        top: calc(100% - 10%);
        height: 10%;
        width: calc(100vw - 30vw);
        align-items: center;
        z-index: 0;
        
        img{
            height: 70px;
        }

        img:first-child {
            margin-left: 10px;
        }

        img:last-child {
            margin-right: 10px;
        }

        a#singin{
            display: none;
        }
    }

    @media (min-width: 1280px){
        width: 80vw;
    }
`;