import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Context
import { useUserContext } from "../../Context/UserContext";

// Components
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Content from "../../Components/Content";

// Style
import { BodyStyle, HomeStyle, GraphqStyle } from "./style";

// Interfaces
import { IOptions } from "../../Interfaces/IOptions";
import { ITable } from "../../Interfaces/ITable";
import { ITableBody } from "../../Interfaces/ITableBody";
import { ITableFooter } from "../../Interfaces/ITableFooter";

// GraphQL
import { useGetFinance, useGetFinancialSummary, useGetFiveJobs } from "../../Graphql/User/hooks";
import { useReactiveVar } from "@apollo/client";
import { getFinanceVar, getFinancialSummaryVar, getFiveJobsVar } from "../../Graphql/User/state";
import { IJob } from "../../Interfaces/IJob";

const Home = () => {
    useGetFinancialSummary();
    useGetFiveJobs();
    const [tableBodyExpense, setTableBodyExpense] = useState<ITableBody[]>([]);
    const tableFooterExpense: ITableFooter = {total: 0};
    const [tableBodyIncome, setTableBodyIncome] = useState<ITableBody[]>([]);
    const tableFooterIncome: ITableFooter = {total: 0};
    const [tableBodyJob, setTableBodyJob] = useState<ITableBody[]>([]);
    const tableFooterJob: ITableFooter = {total: 0};
    const [tableExpense, setTableExpense] = useState<ITable>();
    const [tableIncomes, setTableIncomes] = useState<ITable>();
    const [tableJobs, setTableJobs] = useState<ITable>();
    const { getAuthentication, authentication } = useUserContext();
    const navigate = useNavigate();
    const finace = useGetFinance();   
    const content = useReactiveVar(getFinanceVar);
    const date = new Date();
    const [month, setMonth] = useState<string>('Janeiro');
    const [optionsBar, setOptionsBar] = useState<IOptions | null>(null);
    const financialSummary = useReactiveVar(getFinancialSummaryVar);
    const jobs = useReactiveVar(getFiveJobsVar);
    const [months, setMonths] = useState<string[]>([]);

    useEffect(() => {
        const auth = getAuthentication();

        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Faça o login primeiro');
        }
    }, []);

    useEffect(() => {
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro'];
        const month = date.getMonth();
        setMonth(months[month + 1]);
    }, [date]);

    useEffect(() => {
        setMonths([]);
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Des'];
        const lastMonths = [];
        const month = date.getMonth();
        let start = 11;
        console.log(month);
        for(let i=6;i>0;i--){
            if(!months[month + 1 - i]) {
                lastMonths.push(months[start]);
                start --;
            }else {
                lastMonths.push(months[month + 1 - i]);
            }
        }
        console.log(lastMonths);
        setMonths(lastMonths);
    }, [])

    useEffect(() => {
        setTableBodyExpense([]);
        setTableBodyIncome([]);
        setTableBodyJob([]);
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
            });

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
            });
        }

        if(jobs) {
            jobs.map((job: IJob) => {
                const table: ITableBody = {
                    name: job.establishment,
                    value_installment: job.wage
                }
                tableBodyJob.push(table);
                tableFooterJob.total += table.value_installment;
            });

            setTableJobs({
                tableBody: tableBodyJob,
                tableFooter: tableFooterJob
            });
        }
    }, [finace, jobs]);

    useEffect(() => {
        if(financialSummary?.totalIncomes){
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
                        data: [{
                            value: financialSummary?.totalIncomes.total,
                            // Specify the style for single bar
                            itemStyle: {
                                color: '#3377FF',
                                shadowColor: '#3377FF',
                                borderType: 'dashed',
                                opacity: .7
                            } 
                            }, {
                            value: financialSummary?.totalExpenses.total,
                            // Specify the style for single bar
                            itemStyle: {
                                color: '#DD2222',
                                shadowColor: '#DD2222',
                                borderType: 'dashed',
                                opacity: .8
                            }
                        }],
                        label: {
                            show: true,
                            position: 'top',
                        },
                    },
                ]
            })
        }
    }, [financialSummary]);

    console.log(months);

    const optionasd: IOptions = {
        xAxis: {
            type: 'category',
            data: months,
            axisLabel: {
                interval: 0, // ou 'autoRotate'
                rotate: 0 // ajuste o valor de rotação conforme necessário
            }
        },
        yAxis: {
            type: "value"
        },
        series: [
          {
            data: [10, 22, 28, 43, 49, 20],
            type: 'line',
            stack: 'Rendas',
            areaStyle: {
                color: ' #3377FF',
                shadowColor: ' #3377FF',
                opacity: .7,
            },
            lineStyle: {
                color: '#3377FF' // Define a cor da linha
            },
            itemStyle: {
                color: '#3377FF' // Define a cor da bolinha
            }
          },
          {
            data: [5, 4, 3, 5, 10, 20],
            type: 'line',
            stack: 'Despesas',
            areaStyle: {
                color: '#DD2222',
                shadowColor: '#DD2222',
                opacity: .8
            },
            lineStyle: {
                color: '#DD2222' // Define a cor da linha
            },
            itemStyle: {
                color: '#DD2222' // Define a cor da bolinha
            }
          }, 
        ],
      };

    if(!optionsBar){
        return <div></div>
    }

    return (
        <HomeStyle>
            <NavBar />
            <BodyStyle>
                <Content title={`Resumo mês de ${month}`} type="graph" options={optionsBar}/>
                <Content title={`Resumo ultimos 6 meses`} type="graph" options={optionasd}/>
                <Content title="Despensas" type="table" table={tableExpense}/>
                <Content title="Rendas" type="table" table={tableIncomes}/>
                <Content title="Trabalhos" type="table" table={tableJobs}/>
            </BodyStyle>
            <Footer />
        </HomeStyle>
    );
}

export default Home;