import styled from "styled-components";

export const ToggleMenuStyle = styled.div`
    position: absolute;
    right: 0;
    top: 60px;
    background-color: #FFF;
    width: 130px;
    border: 1px solid #000;
    z-index: 99 !important;

    ul{
        list-style: none;
        margin-left: 6px;
        color: #000;

        li:first-child{
            margin-top: 5px;
        }

        li{
            margin-bottom: 5px;
            border-bottom: 1px solid #000;
            cursor: pointer;
            a {
                text-decoration: none;
                color: #000;
            }

            button {
                border: none;
                background-color: #FFF;
            }
        }

        li:last-child{
            border-bottom: 0;
        }
    }
`;