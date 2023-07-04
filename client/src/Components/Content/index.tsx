import React, { useEffect, useRef, useState } from "react";
import { IContent } from "../../Interfaces/IContent";
import * as echarts from 'echarts';
import { Chart } from "react-google-charts";
import { ContentGraphStyle, ContentTableStyle, ContentContainer, Title, TableTitleStyle, TableBodyStyle, TableFooterStyle } from "./style";
import { ITableBody } from "../../Interfaces/ITableBody";

const Content = ({title, type, options, table, data}: IContent) => {
    const [length, setLength] = useState<number>(0);

    useEffect(() => {
        if(table?.tableBody) {
            const legth = table?.tableBody.length;
            setLength(legth);
        }
    }, [table]);
    //   };
    
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
                <Chart chartType="ColumnChart" width="100%" height="250px" data={data} />
            </ContentContainer>
        )
        }
        </>
    );
}

export default Content;