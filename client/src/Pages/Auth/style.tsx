import styled from "styled-components";

export const ContainerInternoLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 389px) {
        border: 2px solid #000;
        margin: auto;
        width: 90vw;
        margin-top: 35%;
        height: 400px;
        border-radius: 15%;

        h1{
            display: none;
        }
    }

    @media (min-width: 390px) {
        border: 2px solid #000;
        margin: auto;
        width: 90vw;
        margin-top: 35%;
        height: 400px;
        border-radius: 15%;

        h1{
            display: none;
        }
    }

    @media (min-width: 501px) {
        border: none;
        width: 70vw;
        height: 500px;
        margin-top: 0;

        h1 {
            display: inline;
            position: absolute;
            font-size: 2.2em;
            top: 138px;
        }

        @media (min-width: 800px){
            h1 {
                top: 138px;
            }
        }

        @media (min-width: 900px){
            h1 {
                top: 138px;
            }
        }

        @media (min-width: 1280px){
            h1 {
                top: 240px;
            }
        }
    }

    @media (min-width: 1280px) {
        border: 3px solid #000;
        margin: 0 auto;
        width: 60vw;
        max-width: 1280px;
        height: 60vh;
        margin-left: calc(100% - 85%);
        margin-right: calc(100% - 85%);
        margin-top: 125px;
        border-radius: 15%;
    }
`;

export const ContainerInternoSingin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 389px) {
        border: 2px solid #000;
        margin: auto;
        width: 90vw;
        height: 550px;
        border-radius: 15%;

        h1{
            display: none;
        }
    }

    @media (min-width: 390px) {
        border: 2px solid #000;
        margin: auto;
        width: 90vw;
        height: 550px;
        border-radius: 15%;

        h1{
            display: none;
        }
    }

    @media (min-width: 501px) {
        border: none;
        width: 70vw;
        height: 500px;
        margin-top: 0;

        h1 {
            display: inline;
            position: absolute;
            font-size: 1.5em;
            top: 150px;
        }

        @media (min-width: 800px){
            h1 {
                top: 150px;
            }
        }

        @media (min-width: 900px){
            h1 {
                top: 150px;
            }
        }

        @media (min-width: 1283px){
            h1 {
                top: 220px;
            }
        }
    }

    @media (min-width: 1280px) {
        border: 3px solid #000;
        margin: 0 auto;
        width: 70vw;
        max-width: 1280px;
        height: 60vh;
        margin-left: calc(100% - 90%);
        margin-top: 125px;
        border-radius: 15%;
    }
`;

export const Container = styled.section`
    width: 100vw;
    height: 100vh;

    @media (min-width: 501px){
        display: flex;
        margin: 0; 
    }
`;
