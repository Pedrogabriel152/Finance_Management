import React, { useEffect, useRef } from "react";
import { IContent } from "../../Interfaces/IContent";
import * as echarts from 'echarts';
import { ContentGraphStyle, ContentTableStyle, ContentContainer } from "./style";

const Content = ({title, type, options}: IContent) => {
    const chartRef: any = useRef<HTMLDivElement>(null);
    // Create the echarts instance

    
    useEffect(() => {
        if(type === 'graph'){
            const chartInstance = echarts.init(chartRef.current);

            // Configurar o gráfico com os dados fornecidos
            const option = {
                xAxis: options?.xAxis,
                yAxis: options?.yAxis,
                series: options?.series
            };

        
            chartInstance.setOption(option);

            return () => {
                // Limpar o gráfico quando o componente for desmontado
                chartInstance.dispose();
            }
        }
    }, [])
    
    return(

        <>
        {type === 'table' 
        ?(
            <ContentTableStyle>Ola</ContentTableStyle>
        )
        : (
            <ContentContainer>
                <h1>{title}</h1>
                <ContentGraphStyle ref={chartRef}/>
            </ContentContainer>
        )
        }
        </>
    );
}

export default Content;