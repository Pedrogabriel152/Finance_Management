import styled from "styled-components";

export const NavBarStyle = styled.header`
    width: 100vw;
    position: fixed;
    top: 0;
    background: #FFF;
    margin-top: 0;
    padding: 0;
    height: 60px;
    display: flex;
    justify-content: space-between;
    z-index: 99 !important;

    img{
        height: 100%;
    }

    svg{
        margin-top: 15px;
        margin-right: 5px;
    }
    
`;

export const MenuStyle = styled.ul`
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
    font-size: 18px;

    li {
        margin-right: 20px;
        color: #000;

        a{
            color: #000;
            text-decoration: none;
        }

        button {
            font-size: 18px;
            border: none;
            background-color: transparent;
        }
    }


`;