import React, { Component } from 'react';
import { XYPlot, HorizontalGridLines, LabelSeries, VerticalGridLines, XAxis, VerticalBarSeries } from 'react-vis';
import sumArray from './SumArray';
import '../index.css';

var dataplotArr = [
    { x: "Jan", y: 10 },
    { x: "Feb", y: 10 },
    { x: "Mar", y: 10 },
    { x: "Apr", y: -10 },
    { x: "May", y: 10 },
    { x: "Jun", y: 10 },
    { x: "Jul", y: -10 },
    { x: "Aug", y: 10 },
    { x: "Sep", y: 10 },
    { x: "Oct", y: 10 },
    { x: "Nov", y: -10 },
    { x: "Dec", y: -10 },
];

export default class ExpenseInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monthsData: [],
            expenseData: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        fetch("https://moneytreesapi.herokuapp.com/total/12")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    monthsData: data.months,
                    expenseData: data.total,
                })
            }).catch(err => console.error(err));

        this.setState({ isLoading: false });
    }

    // Finds the month in which the max income was made
    findMaxMonth = (expense, months) => {
        var max = { money: expense[0], month: months[0] };

        for (var i = 1; i < expense.length - 1; i++) {
            if (expense[i] > max.money) {
                max.money = expense[i];
                max.month = months[i];
            }
        }

        return max;
    }

    mergeMonthsWithData = (arr) => {
        for (var i = 0; i < 12; i++) {
            dataplotArr[i].y = arr[i];
        }

        return dataplotArr;
    }

    displayText = (textColor) => {
        const totalIncome = sumArray(this.state.expenseData);
        const max = this.findMaxMonth(this.state.expenseData, this.state.monthsData);

        return (
            <>
                <div class='relative top-0 left-3 p-3'> {/* Add fade-in here */}
                    <span class='block text-2xl text-amber-500 font-sans'>Total yearly expenses:</span>
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>${totalIncome}</span>
                </div>
                <div class='relative top-4 left-3 p-3'>
                    <span class='block text-2xl text-amber-500 font-sans'>You spent the most money in</span>
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>{max.month}</span>
                    <span class='block text-2xl text-amber-500 font-sans'>spending</span>
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>${max.money}</span>
                </div>
            </>
        );
    }

    render() {
        const textColor = 'red';
        const graphColor = "#ed544a";

        const graphData = this.mergeMonthsWithData(this.state.expenseData);

        if (this.state.isLoading) {
            return (
                <div class='flex justify-evenly bg-white w-8/12 h-full rounded-xl shadow-md transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg'>
                    <span class='animation-pulse font-sans text-teal-600 text-5xl'>Please wait as the data loads</span>
                </div>
            );
        } else {
            return (
                <div class='flex justify-evenly bg-white w-8/12 h-full rounded-xl shadow-md transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg overflow-scroll'>
                    <div class='flex flex-col w-4/12 ml-4 static p-5 transform scale-100 md:scale-75'>
                        {this.displayText(textColor)}
                    </div>
                    <div class='w-8/12 mr-5 transform scale-100 md:scale-75'>
                        {/* <XYPlot height={400} width={600} xType="ordinal" margin={{ bottom: 70, top: 20 }}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <VerticalBarSeries data={graphData} color={graphColor} />
                            <LabelSeries data={graphData} width={400} getLabel={d => d.y} />
                            <XAxis />
                        </XYPlot> */}
                    </div>
                </div>
            );
        }
    }
}