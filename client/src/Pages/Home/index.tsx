import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { BodyStyle, HomeStyle, GraphqStyle } from "./style";
import Footer from "../../Components/Footer";
import Content from "../../Components/Content";
import { IOptions } from "../../Interfaces/IOptions";
import { toast } from "react-toastify";


const Home = () => {
    const { getAuthentication, authentication } = useUserContext();
    const navigate = useNavigate();
   

    useEffect(() => {
        const auth = getAuthentication();

        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Faça o login primeiro');
        } 
    }, []);


    const option: IOptions = {
        xAxis: {
            data: [ 'Rendas', 'Despesas']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            type: 'bar',
            data: [{
                value: 45,
                // Specify the style for single bar
                itemStyle: {
                  color: '#91cc75',
                  shadowColor: '#91cc75',
                  borderType: 'dashed',
                  opacity: 1
                }
              }, {
                value: 20,
                // Specify the style for single bar
                itemStyle: {
                  color: 'red',
                  shadowColor: '#red',
                  borderType: 'dashed',
                  opacity: 1
                }
              }],
            label: {
                show: true,
                position: 'top',
            },
            }
        ]
    };

    return (
        <HomeStyle>
            <NavBar />
            <BodyStyle>
                <Content title="Resumo mês de Julho" type="graph" options={option}/>
            </BodyStyle>
            <Footer />
        </HomeStyle>
    );
}

export default Home;