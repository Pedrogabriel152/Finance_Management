import styled from "styled-components";

export const ContentContainer = styled.div`
    background-color: #FFF;
    margin-top: 90px;
    width: 90vw;
    margin-left: 5%;
    text-align: center;
    height: 300px;
`;

export const ContentGraphStyle = styled.div`
    width: 80vw;
    height: 250px;
    margin-left: 25px;
    background-color: transparent;
    color: #000;
`;

export const ContentTableStyle = styled.div`
    width: 90vw;
    height: 250px;
    background-color: #FFF;
    margin-top: 40px;
    color: #000;
    margin-left: 5%;
`;

export const Title = styled.h1`
    font-size: 16px;
    background-color: #E6E6E6;
    padding: 8px 0;
    text-align: center;
`;

export const TableTitleStyle = styled.div`
    display: flex;
    justify-content: space-between;
    color: #000;
    font-weight: bold;
    margin-top: 8px;

    div:first-child{
        margin-left: 8%;
    }

    div:last-child{
        margin-right: 8%;
    }
`;

export const TableBodyStyle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    font-size: 14px;

    div:first-child{
        margin-left: 8%;
    }

    div:last-child{
        margin-right: 8%;
    }
`;

export const TableFooterStyle = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-top: 15px;

    div:first-child{
        margin-left: 8%;
    }

    div:last-child{
        margin-right: 8%;
    }
`;