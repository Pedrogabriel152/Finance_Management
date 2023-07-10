import styled from "styled-components";

export const TableJobStyle = styled.div`
    background-color: #FFF;
    margin-top: 120px;
    width: 90vw;
    margin-left: 5%;
`;

export const TableHead = styled.div`
    display: flex;
    font-weight: 600;
    padding: 10px 0;
    justify-content: space-between;
    border-bottom: 2px solid #9a9999;
    border-top: 2px solid #9a9999;
    
    div:first-child {
        margin-left: 15px;
    }

    div:last-child {
        margin-right: 25px;
    }
`;

export const TableBoddy = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 2px solid #D0CBCB;

    div {
        font-size: 14px;
        margin-top: 25px;
        min-width: 23%;
        max-width: 23%;
    }

    div:first-child {
        margin-left: 15px;
        max-width: 20%;
    }

    div:last-child {
        margin-right: 20px;
        min-width: 15%;
        max-width: 15%;
    }
`;