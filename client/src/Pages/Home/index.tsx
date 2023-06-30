import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { BodyStyle, HomeStyle, GraphqStyle } from "./style";
import Footer from "../../Components/Footer";
import Content from "../../Components/Content";
import { IOptions } from "../../Interfaces/IOptions";
import { toast } from "react-toastify";
import { ITable } from "../../Interfaces/ITable";
import { useGetFinance, useGetFinancialSummary } from "../../Graphql/User/hooks";
import { ITableBody } from "../../Interfaces/ITableBody";
import { concat, useReactiveVar } from "@apollo/client";
import { getFinanceVar, getFinancialSummaryVar } from "../../Graphql/User/state";
import { ITableFooter } from "../../Interfaces/ITableFooter";


const Home = () => {
    const [tableBodyExpense, setTableBodyExpense] = useState<ITableBody[]>([]);
    const tableFooterExpense: ITableFooter = {total: 0};
    const [tableBodyIncome, setTableBodyIncome] = useState<ITableBody[]>([]);
    const tableFooterIncome: ITableFooter = {total: 0};
    const [tableExpense, setTableExpense] = useState<ITable>();
    const [tableIncomes, setTableIncomes] = useState<ITable>();
    const { getAuthentication, authentication } = useUserContext();
    const navigate = useNavigate();
    const finace = useGetFinance();   
    const content = useReactiveVar(getFinanceVar);
    const date = new Date();
    const [month, setMonth] = useState<string>('Janeiro');
    const [optionsBar, setOptionsBar] = useState<IOptions | null>(null);
    useGetFinancialSummary();
    const financialSummary = useReactiveVar(getFinancialSummaryVar);

    useEffect(() => {
        const auth = getAuthentication();

        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Faça o login primeiro');
        }
    }, []);

    useEffect(() => {
        const months = ['Janeiro', 'Fevereiro', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro'];
        const month = date.getMonth();
        setMonth(months[month - 1]);
    }, [date])

    useEffect(() => {
        setTableBodyExpense([]);
        tableFooterExpense.total = 0;
        if(finace.error){
            localStorage.removeItem('@auth');
            navigate('/login');
            toast.error('Faça o login primeiro');
            return;
        }

        if(content){
            content.expenses.map((expense: any) => {
                const table: ITableBody = {
                    installments: expense.installments,
                    name: expense.merchandise_purchased,
                    plot_completed: expense.installments_paid,
                    value_installment: expense.value_installment
                }
                tableBodyExpense.push(table);
                tableFooterExpense.total += table.value_installment;
            });

            setTableExpense({
                tableBody: tableBodyExpense,
                tableFooter: tableFooterExpense
            })

            // console.log(tableBodyExpense)
            content.incomes.map((income: any) => {
                const table: ITableBody = {
                    installments: income.installments,
                    name: income.merchandise_purchased,
                    plot_completed: income.installments_received,
                    value_installment: income.value_installment
                }
                tableBodyIncome.push(table);
                tableFooterIncome.total += table.value_installment;
            });

            setTableIncomes({
                tableBody: tableBodyIncome,
                tableFooter: tableFooterIncome
            })
        }

    }, [finace]);

    useEffect(() => {
        console.log(financialSummary)
        setOptionsBar({
        xAxis: {
            data: [ 'Rendas', 'Despesas']
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                type: "bar",
                data: [
                    {
                       value:  2800,//financialSummary?.totalIncomes.total,
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
              }
                ],
                label: {
                show: true,
                position: 'top',
            },
            },
        ]
    })
    }, []);

    console.log(optionsBar)

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

    if(!optionsBar){
        return <div></div>
    }

    return (
        <HomeStyle>
            <NavBar />
            <BodyStyle>
                <Content title={`Resumo mês de ${month}`} type="graph" options={optionsBar}/>
                <Content title="Despensas" type="table" table={tableExpense}/>
                <Content title="Rendas" type="table" table={tableIncomes}/>
            </BodyStyle>
            <Footer />
        </HomeStyle>
    );
}

export default Home;