import styled from "styled-components";

export const ButtonStyle = styled.div`
    position: absolute;
    top: 80px;
    background-color: #FFF;
    width: 130px;
    right: 20px;
    border-radius: 8px;
    color: #000;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-align: center;
    
    a {
        text-decoration: none;
        color: #000;

        span:first-child {
            margin-left: 10px;
            text-align: center;
        }
    }
`;