import styled from "styled-components";

type ITableBody = {
    length: number
}

type IDiv = {
    sencond?: string
}

export const ContentContainer = styled.div<IDiv>`
    background-color: #FFF;
    margin-top: ${(props: IDiv) => props.sencond === "LineChart"? '40px' : '90px'};
    width: 90vw;
    margin-left: 5%;
    text-align: center;
    height: 300px;

    @media (min-width: 1280px) {
        width: 40vw;
        margin-top: 90px;
    }
`;

export const ContentTableStyle = styled.div`
    width: 90vw;
    height: 250px;
    background-color: #FFF;
    margin-top: 40px;
    color: #000;
    margin-left: 5%;

    @media (min-width: 1280px) {
        width: 25vw;
        margin-top: -50px;
    }
`;

export const Title = styled.h1`
    font-size: 16px;
    background-color: #E6E6E6;
    padding: 8px 0;
    text-align: center;

    @media (min-width: 500px) and (max-width: 730px) {
        font-size: 20px;
    }
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

    @media (min-width: 500px) and (max-width: 730px) {
        font-size: 18px;
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

    @media (min-width: 500px) and (max-width: 730px) {
        font-size: 16px;
    }
`;
// 15, 90, 70, 50
export const TableFooterStyle = styled.div<ITableBody>`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-top: ${(props: ITableBody) => `${props.length}px`};

    div:first-child{
        margin-left: 8%;
    }

    div:last-child{
        margin-right: 8%;
    }

    @media (min-width: 500px) and (max-width: 730px) {
        margin-top: ${(props: ITableBody) => `${props.length - 10}px`};
    }
`;

export const TableFooterRespStyle = styled.div`
    position: relative;
    background-color: blue;
    bottom: 0;
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