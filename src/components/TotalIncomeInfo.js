import React, { Component } from 'react';
import { XYPlot, HorizontalGridLines, LabelSeries, VerticalGridLines, XAxis, VerticalBarSeries } from 'react-vis';
import sumArray from './SumArray';
import '../index.css'

var dataplotArr = [
    { x: "Jan", y: 60 },
    { x: "Feb", y: -50 },
    { x: "Mar", y: 40 },
    { x: "Apr", y: 10 },
    { x: "May", y: 15 },
    { x: "Jun", y: -30 },
    { x: "Jul", y: 50 },
    { x: "Aug", y: 33 },
    { x: "Sep", y: 25 },
    { x: "Oct", y: -12 },
    { x: "Nov", y: -13 },
    { x: "Dec", y: -21 },
];

export default class IncomeInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incomeData: [],
            monthsData: [],
            isLoading: true,
        }

        this.displayText = this.displayText.bind(this);
        this.mergeData = this.mergeData.bind(this);
    }

    componentDidMount() {
        fetch('https://moneytreesapi.herokuapp.com/income/12')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    incomeData: data.total_income,
                    monthsData: data.months,
                })
            }).catch(err => console.error(err));
        
        this.setState({ isLoading: false });
    }

    // Finds the month in which the max income was made
    findMaxMonth = (income, months) => {
        var max = { money: income[0], month: months[0] };

        for (var i = 1; i < income.length - 1; i++) {
            if (income[i] > max.money) {
                max.money = income[i];
                max.month = months[i];
            }
        }

        return max;
    }

    // Creates an array of objects that can be used by React-vis to graph data
    mergeData = arr => {
        for (var i = 0; i < 12; i++) {
            dataplotArr[i].y = this.state.incomeData[i];
            console.log(dataplotArr[i].toString() + " " + this.state.incomeData.toString());
        }

        return dataplotArr;
    }

    displayText = (textColor) => {
        const totalIncome = sumArray(this.state.incomeData);
        const max = this.findMaxMonth(this.state.incomeData, this.state.monthsData);

        return (
            <>
                <div class='relative top-0 left-3 p-3'> {/* Add fade-in here */}
                    <span class='block text-2xl text-amber-500 font-medium font-sans'>Your total income for the year was</span>
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>${totalIncome}</span>
                    <span class='block text-2xl text-amber-500 font-sans'>this year!</span>
                </div>
                <div class='relative top-4 left-3 p-3'>
                    <span class='block text-2xl text-amber-500 font-medium font-sans'>You made the most money in</span>
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>{max.month}</span>
                    <span class='block text-2xl text-amber-500 font-medium font-sans'>pulling in</span>
                    <span class={`block font semi-bold text-6xl text-${textColor}-500`}>${max.money}</span>
                </div>
            </>
        );
    }

    render() {
        const textColor = 'green';
        const graphColor = "#47e664";
        const graphData = this.mergeData();

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
                        <XYPlot height={400} width={600} xType="ordinal" margin={{ bottom: 70, top: 20 }}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <VerticalBarSeries data={graphData} color={graphColor} />
                            <LabelSeries data={graphData} width={400} getLabel={d => d.y} />
                            <XAxis />
                        </XYPlot>
                    </div>
                </div>
            );
        }
    }
}