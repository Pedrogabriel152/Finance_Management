import styled from "styled-components";

export const FooteStyle = styled.footer`
    width: 100vw;
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
`;