import { useEffect, useState } from "react";
import { IContent } from "../../Interfaces/IContent";
import { Chart } from "react-google-charts";
import { ContentTableStyle, ContentContainer, Title, TableTitleStyle, TableBodyStyle, TableFooterStyle } from "./style";
import { ITableBody } from "../../Interfaces/ITableBody";

const Content = ({title, type, options, table, data, chartType, size}: IContent) => {
    const [length, setLength] = useState<number>(0);

    useEffect(() => {
        if(table?.tableBody) {
            const legth = table?.tableBody.length;
            setLength(legth);
        }
    }, [table]);
    
    return(

        <>
        {type === 'table' 
        ? (
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
                        <div>{table.value_installment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </TableBodyStyle>
                ))}
                
                <TableFooterStyle length={length === 5? 15 : length === 4? 45 : length === 3? 70 : length === 2? 90 : 125}>
                    <div>Total</div>
                    <div>{table?.tableFooter.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </TableFooterStyle>
            </ContentTableStyle>
        ) : (
            <ContentContainer sencond={chartType}>
                <Title>{title}</Title>
                <Chart chartType={chartType} width='100%' height="250px" data={data} options={options}/>
            </ContentContainer>
        )}
        </>
    );
}

export default Content;