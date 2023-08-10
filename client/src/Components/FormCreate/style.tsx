import styled from "styled-components";

export const FormContainerJob = styled.main`
    padding-top: 40%;

    @media (min-width: 1280px) {
        padding-top: 15%;
    }
`;

export const FormContainerFinance = styled.main`
    padding-top: 20%;
`;

export const FormStyleJob = styled.form`
    background-color: #FFF;
    width: 90vw;
    margin-left: 5%;
    border-radius: 8px;
    font-size: 1.1em;
    height: 53vh;

    @media (min-width: 1280px) {
        margin: 0 auto;
        width: 50vw;
    }
`;

export const FormStyleFinance = styled.form`
    background-color: #FFF;
    width: 90vw;
    margin-left: 5%;
    border-radius: 8px;
    font-size: 1.1em;
    height: 70vh;
`;

export const LabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 90%;
    
    label {
        margin-top: 15px;
        font-weight: 500;
    }

    input#currency {
        padding: 8px 15px;
        margin-top: 5px;
    }
`;

export const InputCreateStyle = styled.input`
    padding: 8px 15px;
    margin-top: 5px;
`;

export const ButtonSubmit = styled.button`
    padding: 8px 35px;
    margin-top: 15px;
    margin-left: 30%;
    background-color: #050038;
    border: none;
    color: #FFF;
    border-radius: 10px;

    @media (min-width: 1280px) {
        margin-top: 15px;
        padding: 10px 55px;
        justify-content: center;
    }
`;