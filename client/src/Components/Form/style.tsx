import styled from "styled-components";

export const FormLoginStyle = styled.form`
    color: #000;

    button {
        background: #050038;
        color: #FFF;
        border: none;
        border-radius: 5px;
    }

    @media (max-width: 500px) {
        button{
            padding: 12px 40px;
            margin-top: calc(100% - 230px);
            margin-left: calc(100% - 73%);
            font-size: 16px;
        }   
    }

    @media (min-width: 501px) {
        button {
            font-size: 1.5em;
            margin-top: 35px;
            padding: 18px 90px;
            margin-left: calc(100% - 85%);
        }
    }
`;

export const FormSinginStyle = styled.form`
    color: #000;

    button {
        background: #050038;
        color: #FFF;
        border: none;
        border-radius: 5px;
    }

    @media (max-width: 500px) {
        button{
            padding: 12px 40px;
            margin-top: calc(100% - 230px);
            margin-left: calc(100% - 73%);
            font-size: 16px;
        }   
    }

    @media (min-width: 501px) {
        button {
            font-size: 1.2em;
            margin-top: 25px;
            padding: 18px 70px;
            margin-left: calc(100% - 80%);
        }
    }

    @media (min-width: 1280px) {
        display: flex;
        flex-wrap: wrap;

        button {
            position: absolute;
            font-size: 1em;
            padding: 18px 70px;
            top: 60%;
            left: 35%;
        }
    }
`;

export const InputStyleLogin = styled.div`
    @media (max-width: 500px) {
        svg{
            position: relative;
            right: 89%;
            top: 7px;
            z-index: 99;
        }

        input{
            padding: 12px 25px;
        }

        input::placeholder {
            padding-left: 10px;
        }
        margin-bottom: 12px;   
    }

    @media (min-width: 501px){
        svg{
            position: relative;
            right: 89%;
            top: 12px;
            z-index: 99;
        }

        input#email {
            margin-top: 15%;
        }

        input{
            padding: 20px 65px;
            font-size: 18px;
        }

        input::placeholder {
            font-size: 20px;
        }

        margin-bottom: 35px;   
    }

    @media (min-width: 1000px) {
        input#email {
            margin-top: 8%;
        }

        input{
            padding: 12px 85px;
            font-size: 18px;
        }

        input::placeholder {
            font-size: 20px;
        }

        margin-bottom: 35px; 
    }
`;

export const InputStyleSingin = styled.div`
    @media (max-width: 500px) {
        svg{
            position: relative;
            right: 89%;
            top: 7px;
            z-index: 99;
        }

        input{
            padding: 12px 25px;
        }

        input::placeholder {
            padding-left: 10px;
        }

        margin-bottom: 5px;   
    }

    @media (min-width: 501px){
        svg{
            position: relative;
            right: 89%;
            top: 12px;
            z-index: 99;
        }

        input{
            padding: 8px 65px;
            font-size: 18px;
        }

        input::placeholder {
            font-size: 20px;
        }

        margin-bottom: 10px;   
    }

    @media (min-width: 1280px) {
        svg{
            position: relative;
            right: 82%;
            top: 12px;
            z-index: 99;
        }

        input{
            padding: 10px 65px;
            font-size: 18px;
            margin-left: 45px;
        }

        input::placeholder {
            font-size: 20px;
        }

        margin-bottom: 8px; 
    }
`;

export const LinkStyleLogin = styled.div`
    
    a{
        color: #000;
    }

    @media (max-width: 500px) {
        font-size: .9em;

        a#singin{
            margin-left: 65px;
        }
    }

    @media (min-width: 501px){
        font-size: 1.5em;

        a#singin{
            display: none;
        }
    }
`;

export const LinkStyleSingIn = styled.div`
    
    a{
        color: #000;
    }

    @media (max-width: 500px) {
        font-size: .9em;
    }

    @media (min-width: 501px){
        font-size: 1.2em;
    }

    @media (min-width: 1283px){
        position: absolute;
        font-size: 1em;
        top: 60%;
        left: 31%;
    }
`;