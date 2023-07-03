import React, { useEffect, useRef, useState } from "react";
import { IContent } from "../../Interfaces/IContent";
import * as echarts from 'echarts';
import { ContentGraphStyle, ContentTableStyle, ContentContainer, Title, TableTitleStyle, TableBodyStyle, TableFooterStyle } from "./style";
import { ITableBody } from "../../Interfaces/ITableBody";

const Content = ({title, type, options, table}: IContent) => {
    const chartRef: any = useRef<HTMLDivElement>(null);
    const [length, setLength] = useState<number>(0);
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
    }, []);

    useEffect(() => {
        if(table?.tableBody) {
            const legth = table?.tableBody.length;
            setLength(legth);
        }
    }, [table]);
    
    return(

        <>
        {type === 'table' 
        ?(
            <ContentTableStyle>
                <Title>{title}</Title>
                <TableTitleStyle>
                    <div>Nome</div>
                    {table?.tableBody[0].installments &&
                        <div>Parcelas</div>
                    }
                    <div>Valor</div>
                </TableTitleStyle>
                {table?.tableBody.map((table: ITableBody, index: number) => (
                    <TableBodyStyle key={index}>
                        <div>{table.name}</div>
                        {table.installments &&
                            <div>{table.plot_completed}/{table.installments}</div>
                        }
                        <div>{table.value_installment}</div>
                    </TableBodyStyle>
                ))}
                <TableFooterStyle length={length === 5? 15 : length === 4? 50 : length === 3? 70 : 90}>
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