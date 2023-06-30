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
import { useGetFinance } from "../../Graphql/User/hooks";
import { ITableBody } from "../../Interfaces/ITableBody";
import { concat, useReactiveVar } from "@apollo/client";
import { getFinanceVar } from "../../Graphql/User/state";
import { ITableFooter } from "../../Interfaces/ITableFooter";


const Home = () => {
    const [tableBodyExpense, setTableBodyExpense] = useState<ITableBody[]>([]);
    const tableFooterExpense: ITableFooter = {
        total: 0
    };
    const [tableExpense, setTableExpense] = useState<ITable>();
    const [tableIncomes, setTableIncomes] = useState<ITable>();
    const { getAuthentication, authentication } = useUserContext();
    const navigate = useNavigate();
    const finace = useGetFinance();   
    const content = useReactiveVar(getFinanceVar);

    useEffect(() => {
        const auth = getAuthentication();

        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Faça o login primeiro');
        }
    }, []);

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
                setTableIncomes({
                    tableBody: tableIncomes?.tableBody ? tableIncomes?.tableBody.concat([
                        {
                            installments: income.installments,
                            name: income.merchandise_purchased,
                            plot_completed: income.installments_paid,
                            value_installment: income.value_installment
                        }
                    ]) : [{
                        installments: income.installments,
                        name: income.merchandise_purchased,
                        plot_completed: income.installments_paid,
                        value_installment: income.value_installment
                    }],
                    tableFooter: {
                        total: tableIncomes?.tableFooter.total? tableIncomes?.tableFooter.total + income.value_installment : income.value_installment
                    }
                });
            });
        }

    }, [finace]);

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
                <Content title="Despensas" type="table" table={tableExpense}/>
                <Content title="Rendas" type="table" table={tableExpense}/>
            </BodyStyle>
            <Footer />
        </HomeStyle>
    );
}

export default Home;