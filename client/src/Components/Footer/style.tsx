import styled from "styled-components";

export const FooteStyle = styled.footer`
    width: 100%;
    height: 11.5vh;
    background-color: #0D074F;
    color: #FFF;
    margin-bottom: 0;
    margin-top: 40px;

    p {
        padding-top: 5px;
        font-size: 12px;
        text-align: center;
    }

    @media (max-width: 360px){
        height: 14.5vh;
    }

    @media (min-width: 500px) and (max-width: 730px) {
        height: 16vh;

        p {
            padding-top: 15px;
            font-size: 16px;
        }
    }

    @media (min-width: 1280px) {
        height: 16vh;
        margin-top: -43px;

        p {
            padding-top: 15px;
            font-size: 16px;
        }
    }
`;

export const IconeFooterStyle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    a:first-child{
        margin-left: 30px;
    }

    a:last-child{
        margin-right: 30px;
    }

    @media (min-width: 500px) and (max-width: 730px) {
        margin-top: 50px;
    }

    @media (min-width: 1280px) {
        justify-content: center;
        
        svg:first-child {
            margin-right: 60px;
        }
    }
`;