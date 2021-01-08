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

export default class Other extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monthsData: [],
            expenseData: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        fetch("https://moneytreesapi.herokuapp.com/other/12")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    monthsData: data.months,
                    expenseData: data.other,
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

    mergeData = (arr) => {
        for (var i = 0; i < 12; i++) {
            dataplotArr[i].y = arr[i];
        }

        return dataplotArr;
    }

    displayText = (textColor) => {
        const totalExpense = sumArray(this.state.expenseData);
        const max = this.findMaxMonth(this.state.expenseData, this.state.monthsData);

        return (
            <>
                <div class='relative center p-3 border-b border-gray-400'> {/* Add fade-in here */}
                    <span class='block text-2xl text-amber-500 font-sans'>Total spent on other categories:</span>
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>${totalExpense}</span>
                </div>
                <div class='relative  left-3 p-2'>
                    <span class='block text-2xl text-amber-500 font-sans'>You spent the most money in</span>
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>{max.month}</span>
                    <span class='block text-2xl text-amber-500 font-sans'>spending</span> 
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>${max.money}</span>
                </div>
            </>
        );
    }

    displayGraph = () => {
        const graphColor = "#966C00";

        if (this.state.expenseData[0] > 0) {
            const graphData = this.mergeData(this.state.expenseData);

            return (
                <XYPlot height={400} width={600} xType="ordinal" margin={{ bottom: 70, top: 20 }}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <VerticalBarSeries data={graphData} color={graphColor} />
                    <LabelSeries data={graphData} width={400} getLabel={d => `$${d.y}`} />
                    <XAxis />
                </XYPlot>
            );
        } else {
            return <span class='animation-pulse font-sans text-teal-600 text-5xl'>Please wait as the data loads</span>;
        }
    }

    render() {
        const textColor = '';

        if (this.state.isLoading) {
            return (
                <div class='flex justify-evenly bg-white w-8/12 h-full rounded-xl shadow-md transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg'>
                    <span class='animation-pulse font-sans text-teal-600 text-5xl'>Please wait as the data loads</span>
                </div>
            );
        } else {
            return (
                <div class='flex justify-evenly bg-white w-8/12 h-full rounded-xl shadow-md transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg overflow-scroll'>
                    <div class='w-8/12 mr-5 transform scale-100 md:scale-90'>
                        {this.displayGraph()}
                    </div>
                    <div class='flex flex-col w-4/12 static p-2 transform scale-100 md:scale-75 sm:scale-75'>
                        {this.displayText(textColor)}
                    </div>
                </div>
            );
        }
    }
}
