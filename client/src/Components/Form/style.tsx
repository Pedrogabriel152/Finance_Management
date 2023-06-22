import styled from "styled-components";

export const FormStyle = styled.form`
    color: #000;

    @media screen {
        button{
            padding: 12px 40px;
            margin-top: calc(100% - 230px);
            margin-left: calc(100% - 73%);
            background: #050038;
            color: #FFF;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }   
    }
`;

export const InputStyle = styled.div`
    @media screen {
        svg{
            position: relative;
            right: 89%;
            top: 7px;
            z-index: 99;
        }

        input{
            padding: 12px 25px;
        }
        margin-bottom: 25px;   
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
`;

export const LinkStyle = styled.div`
    
    a{
        color: #000;
    }

    @media screen {
        font-size: .9em;

        a#singin{
            margin-left: 65px;
        }
    }

    @media (min-width: 501px){
        a#singin{
            display: none;
        }
    }
`;