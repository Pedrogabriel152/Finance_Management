import styled from "styled-components";

export const AbaLateralStyle = styled.div`
    @media (max-width: 500px) {
        visibility: hidden;
    }

    @media (min-width: 501px){
        visibility: unset;
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #114262;
        width: 30vw;
        align-items: self-end;

        a:first-child {
            margin-top: calc(100vh - 65vh);
            margin-bottom: 16px;
        }

        a{
            border: none;
            color: #FFF;
            text-decoration: none;
            font-size: 1.3em;
            padding: 15px 20px;
            border-radius: 8px;
        }

        a#activi{
            background: #6CA6CD;
            color: #000;
        }

        @media (min-width: 1000px) {
            width: 20vw;
        }

    }
`;