import styled from "styled-components";

export const ContainerInterno = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 389px) {
        border: 2px solid #000;
        margin: auto;
        width: 90vw;
        margin-top: 35%;
        height: 60vh;
        border-radius: 15%;
    }

    @media (min-width: 390px) {
        border: 2px solid #000;
        margin: auto;
        width: 90vw;
        margin-top: 35%;
        height: 50vh;
        border-radius: 15%;
    }

    @media (min-width: 501px) {
        border: none;
        width: 70vw;
        height: 100vh;
    }
`;

export const Container = styled.section`
    margin: 0 auto;
    width: 100vw;
`;


export const AbaLateral = styled.div`
    
`;