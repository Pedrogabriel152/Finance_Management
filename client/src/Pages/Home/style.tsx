import styled from "styled-components";

export const HomeStyle = styled.section`
    margin: 0;
`;

export const BodyStyle = styled.main`
    width: 100vw;
    min-height: 88.45vh;

    @media (min-width: 1280px) {
        display: flex;
        flex-wrap: wrap;
    }
`;

export const GraphqStyle = styled.div`
    width: 400px;
    height: 400px;
    margin-top: 3em;
    z-index: 1;
`;