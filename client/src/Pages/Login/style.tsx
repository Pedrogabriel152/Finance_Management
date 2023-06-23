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
            top: 300px;
        }

        @media (min-width: 800px){
            h1 {
                top: 300px;
            }
        }

        @media (min-width: 900px){
            h1 {
                top: 300px;
            }
        }
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
