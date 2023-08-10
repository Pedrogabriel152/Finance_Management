import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Context
import { useUserContext } from "../../Context/UserContext";

// Components
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Content from "../../Components/Content";
import ModalLoading from "../../Components/ModalLoading";

// Style
import { BodyStyle, HomeStyle } from "./style";

// Interfaces
import { IOptions } from "../../Interfaces/IOptions";
import { ITable } from "../../Interfaces/ITable";
import { ITableBody } from "../../Interfaces/ITableBody";
import { ITableFooter } from "../../Interfaces/ITableFooter";
import { IJob } from "../../Interfaces/IJob";

// GraphQL
import { useGetFinance, useGetFinancialSummary, useGetMonthlySummaryVar } from "../../Graphql/Finance/hooks";
import { useGetFiveJobs } from "../../Graphql/Job/hooks";
import { useReactiveVar } from "@apollo/client";
import { getFinanceVar, getMonthlySummaryVar } from "../../Graphql/Finance/state";
import { getFiveJobsVar } from "../../Graphql/Job/state";

const Home = () => {
    const { loading: loadJobs } = useGetFiveJobs();
    const { loading: loadSummaryMonths } = useGetMonthlySummaryVar();
    const date = new Date();
    const [tableExpense, setTableExpense] = useState<ITable>();
    const [tableIncomes, setTableIncomes] = useState<ITable>();
    const [size, setSize] = useState<number>(500);
    const [tableBodyExpense, setTableBodyExpense] = useState<ITableBody[]>([]);
    const [tableBodyIncome, setTableBodyIncome] = useState<ITableBody[]>([]);
    const [tableBodyJob, setTableBodyJob] = useState<ITableBody[]>([]);
    const [tableJobs, setTableJobs] = useState<ITable>();
    const [month, setMonth] = useState<string>('Janeiro');
    const [optionsLine, setOptionsLine] = useState<IOptions | null>(null);
    const [dataLine, setDataLine] = useState<any[]>([]);
    const [months, setMonths] = useState<string[]>([]);
    const [dataBars, setDataBras] = useState<any[]>([]);
    const tableFooterExpense: ITableFooter = {total: 0};   
    const tableFooterIncome: ITableFooter = {total: 0};
    const tableFooterJob: ITableFooter = {total: 0};
    const { getAuthentication } = useUserContext();
    const navigate = useNavigate();
    const finace = useGetFinance();   
    const content = useReactiveVar(getFinanceVar);
    const jobs = useReactiveVar(getFiveJobsVar);
    const monthlySummary = useReactiveVar(getMonthlySummaryVar);

    useEffect(() => {
        const size = window.screen.width;

        setSize(size);
    }, [size]);
    

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

        if(finace) {
            if(finace.error){
                localStorage.removeItem('@auth');
                navigate('/login');
                toast.error('Faça o login primeiro');
                return;
            }
        }

        if(content){
            if(content.expenses){
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
            }else {
                setTableExpense({
                    tableBody: [],
                    tableFooter: {
                        total: 0
                    }
                });
            }

            if(content.incomes){
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
            }else {
                setTableIncomes({
                    tableBody: [],
                    tableFooter: {
                        total: 0
                    }
                })
            }
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
        if(months){
            const data: any[][] = [["Mes", "Rendas", "Despesas"]];
            setOptionsLine({
                title: "",
                curveType: "none",
                legend: { position: "bottom" },
                colors: ["#3377FF", "#DD2222"],
                vAxis: {
                    format: 'R$ #,##0.00'
                },
            });

            monthlySummary?.incomesMonth.map((income: any) => {
                const line = [income.month, income.total];
                data.push(line);
            });

            monthlySummary?.expensesMonth.map((expense: any, index: number) => {
                data[index+1].push(expense.total);
            });

            setDataLine(data); 
            setDataBras([
                ["Element", "Valor", { role: "style" }],
                ['Rendas', data[data.length -1][1], 'stroke-color: #3377FF; fill-color: #3377FF; fill-opacity: 0.7'],
                ['Despensas', data[data.length -1][2], 'stroke-color: #DD2222; fill-color: #DD2222; fill-opacity: 0.7']
            ]);
        }
    }, [monthlySummary]);

    if(loadJobs || loadSummaryMonths || !optionsLine){
        return (
            <>
            <NavBar />
            <ModalLoading/>
            <Footer />
            </>
        )
    }

    return (
        <HomeStyle>
            <NavBar />
            <BodyStyle>
                <Content title={`Resumo mês de ${month}`} type="graph" data={dataBars} chartType="ColumnChart" size={size}/>
                <Content title={`Resumo últimos 6 meses`} type="graph" data={dataLine} options={optionsLine} chartType="LineChart" size={size}/>
                <Content title="Despensas" type="table" table={tableExpense} size={size}/>
                <Content title="Rendas" type="table" table={tableIncomes} size={size}/>
                <Content title="Trabalhos" type="table" table={tableJobs} size={size}/>
            </BodyStyle>
            <Footer />
        </HomeStyle>
    );
}

export default Home;