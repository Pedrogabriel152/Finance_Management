import styled from "styled-components";

export const FormStyle = styled.form`
    color: #000;

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
`;

export const InputStyle = styled.div`
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