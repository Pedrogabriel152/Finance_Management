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
import { useGetFinance, useGetFinancialSummary, useGetMonthlySummaryVar } from "../../Graphql/Finance/hooks";
import { useGetFiveJobs } from "../../Graphql/Job/hooks";
import { useReactiveVar } from "@apollo/client";
import { getFinanceVar, getFinancialSummaryVar, getMonthlySummaryVar } from "../../Graphql/Finance/state";
import { getFiveJobsVar } from "../../Graphql/Job/state";
import { IJob } from "../../Interfaces/IJob";

const Home = () => {
    useGetFinancialSummary();
    useGetFiveJobs();
    useGetMonthlySummaryVar();
    const date = new Date();
    const [tableExpense, setTableExpense] = useState<ITable>();
    const [tableIncomes, setTableIncomes] = useState<ITable>();
    const [tableBodyExpense, setTableBodyExpense] = useState<ITableBody[]>([]);
    const [tableBodyIncome, setTableBodyIncome] = useState<ITableBody[]>([]);
    const [tableBodyJob, setTableBodyJob] = useState<ITableBody[]>([]);
    const [tableJobs, setTableJobs] = useState<ITable>();
    const [month, setMonth] = useState<string>('Janeiro');
    const [optionsBar, setOptionsBar] = useState<IOptions | null>(null);
    const [optionsLine, setOptionsLine] = useState<IOptions | null>(null);
    const [months, setMonths] = useState<string[]>([]);
    const [dataBars, setDataBras] = useState<any[]>([]);
    const tableFooterExpense: ITableFooter = {total: 0};   
    const tableFooterIncome: ITableFooter = {total: 0};
    const tableFooterJob: ITableFooter = {total: 0};
    const { getAuthentication } = useUserContext();
    const navigate = useNavigate();
    const finace = useGetFinance();   
    const content = useReactiveVar(getFinanceVar);
    const financialSummary = useReactiveVar(getFinancialSummaryVar);
    const jobs = useReactiveVar(getFiveJobsVar);
    const monthlySummary = useReactiveVar(getMonthlySummaryVar);
    

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
        console.log(month)
        setMonth(months[month]);
    }, [date]);

    useEffect(() => {
        setMonths([]);
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Des'];
        const lastMonths = [];
        const month = date.getMonth();
        let start = 11;
        for(let i=6;i>0;i--){
            if(!months[month + 1 - i]) {
                lastMonths.push(months[start]);
                start --;
            }else {
                lastMonths.push(months[month + 1 - i]);
            }
        }
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

        const data = [
            ['Rendas', 'Despesas'],
            ['Rendas', ]
        ];
        if(financialSummary?.totalIncomes){
            setOptionsBar({
                hAxis: {
                    title: "Gastos e Ganhos"
                }, 
                vAxis: {
                    title: "Valor"
                },
                seriesType: "bars",
                title: ""
            });
            setDataBras([
                ["Element", "Valor", { role: "style" }],
                ['Rendas', financialSummary?.totalIncomes.total, 'stroke-color: #3377FF; fill-color: #3377FF; fill-opacity: 0.7'],
                ['Despensas', financialSummary?.totalExpenses.total, 'stroke-color: #DD2222; fill-color: #DD2222; fill-opacity: 0.7']
            ]);
        }
    }, [financialSummary]);

    useEffect(() => {
        console.log("Values => ", months);
        if(months){
            const options: IOptions = {
                hAxis: {
                    title: "Valor"
                }, 
                vAxis: {
                    title: "Gastos e Ganhos"
                },
                seriesType: "bars",
                title: ""
                
                // xAxis: {
                //     type: 'category',
                //     data: months,
                //     axisLabel: {
                //         interval: 0, // ou 'autoRotate'
                //         rotate: 0 // ajuste o valor de rotação conforme necessário
                //     }
                // },
                // yAxis: {
                //     type: "value",
                //     axisLabel: {
                //         fontSize: 10 // Define o tamanho da fonte desejado
                //     }
                // },
                // series: [
                //   {
                //     data: [3700, 2200, 2800, 4300, 4900, 2000],
                //     type: 'line',
                //     stack: 'Rendas',
                //     areaStyle: {
                //         color: ' #3377FF',
                //         shadowColor: ' #3377FF',
                //         opacity: .7,
                //     },
                //     lineStyle: {
                //         color: '#3377FF' // Define a cor da linha
                //     },
                //     itemStyle: {
                //         color: '#3377FF' // Define a cor da bolinha
                //     }
                //   },
                //   {
                //     data: [500, 400, 300, 500, 1000, 2000],
                //     type: 'line',
                //     stack: 'Despesas',
                //     areaStyle: {
                //         color: '#DD2222',
                //         shadowColor: '#DD2222',
                //         opacity: .8
                //     },
                //     lineStyle: {
                //         color: '#DD2222' // Define a cor da linha
                //     },
                //     itemStyle: {
                //         color: '#DD2222' // Define a cor da bolinha
                //     }
                //   }, 
                // ],
            };

            
    
            setOptionsLine(options);
        }
    }, [monthlySummary]);

    

    if(!optionsBar || !optionsLine){
        return <div></div>
    }

    return (
        <HomeStyle>
            <NavBar />
            <BodyStyle>
                <Content title={`Resumo mês de ${month}`} type="graph" options={optionsBar} data={dataBars}/>
                <Content title={`Resumo ultimos 6 meses`} type="graph" options={optionsLine}/>
                <Content title="Despensas" type="table" table={tableExpense}/>
                <Content title="Rendas" type="table" table={tableIncomes}/>
                <Content title="Trabalhos" type="table" table={tableJobs}/>
            </BodyStyle>
            <Footer />
        </HomeStyle>
    );
}

export default Home;