import React, { useEffect, useRef } from "react";
import { IContent } from "../../Interfaces/IContent";
import * as echarts from 'echarts';
import { ContentGraphStyle, ContentTableStyle, ContentContainer, Title, TableTitleStyle, TableBodyStyle, TableFooterStyle } from "./style";
import { ITableBody } from "../../Interfaces/ITableBody";

const Content = ({title, type, options, table}: IContent) => {
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
            console.log(option)

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
            <ContentTableStyle>
                <Title>{title}</Title>
                <TableTitleStyle>
                    <div>Nome</div>
                    <div>Parcelas</div>
                    <div>Valor</div>
                </TableTitleStyle>
                {table?.tableBody.map((table: ITableBody, index: number) => (
                    <TableBodyStyle key={index}>
                        <div>{table.name}</div>
                        <div>{table.plot_completed}/{table.installments}</div>
                        <div>{table.value_installment}</div>
                    </TableBodyStyle>
                ))}
                <TableFooterStyle>
                    <div>Total</div>
                    <div>{table?.tableFooter.total}</div>
                </TableFooterStyle>
            </ContentTableStyle>
        )
        : (
            <ContentContainer>
                <Title>{title}</Title>
                <ContentGraphStyle ref={chartRef}/>
            </ContentContainer>
        )
        }
        </>
    );
}

export default Content;