import React, { Component } from 'react';
import '../index.css';
import { XYPlot, LabelSeries, YAxis, HorizontalBarSeries } from 'react-vis';
import sumArray from './SumArray';

const spendingCategories = [
    { y: "Food", x: 5100 },
    { y: "Utility", x: 846 },
    { y: "Transportation", x: 1242 },
    { y: "Subscriptions", x: 708 },
    { y: "Other", x: 0 },
];

export default class SpendRank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            utilityData: [],
            foodData: [],
            transportationData: [],
            subscriptionsData: [],
            otherData: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        Promise.all([
            fetch("https://moneytreesapi.herokuapp.com/utility/12"),
            fetch("https://moneytreesapi.herokuapp.com/food/12"),
            fetch("https://moneytreesapi.herokuapp.com/transportation/12"),
            fetch("https://moneytreesapi.herokuapp.com/subscriptions/12"),
            fetch("https://moneytreesapi.herokuapp.com/other/12")
        ]).then(function (response) {
            return Promise.all(response.map((res) => {
                return res.json();
            }))
        }).then(dataArr => {
            this.setState({
                utilityData: dataArr[0].total_utility,
                foodData: dataArr[1].total_food,
                transportationData: dataArr[2].total_transportation,
                subscriptionsData: dataArr[3].subscriptions,
                otherData: dataArr[4].other
            })
        }).catch(err => console.error(err));

        this.setState({ isLoading: false });
    }

    mergeData = () => {
        spendingCategories[0].x = sumArray(this.state.foodData);
        spendingCategories[1].x = sumArray(this.state.utilityData);
        spendingCategories[2].x = sumArray(this.state.transportationData);
        spendingCategories[3].x = sumArray(this.state.subscriptionsData);
        spendingCategories[4].x = sumArray(this.state.otherData);

        return spendingCategories;
    }

    findMaxExpense = () => {
        const food = sumArray(this.state.foodData);
        const utility = sumArray(this.state.utilityData);
        const transport = sumArray(this.state.transportationData);
        const sub = sumArray(this.state.subscriptionsData);
        const other = sumArray(this.state.otherData);

        var arr = [food, utility, transport, sub, other];
        var sorted = arr.sort((a,b) => a-b);

        if (sorted[4] === food)
            return { y: "Food", x: food }
        else if (sorted[4] === utility) {
            console.log(arr[4]);
            return { y: "Utilities", x: utility }
        } else if (sorted[4] === transport)
            return { y: "Transportation", x: transport }
        else if (sorted[4] === sub)
            return { y: "Subscriptions", x: sub }
        else
            return { y: "Other", x: other }
    }

    displayText = () => {
        const max = this.findMaxExpense();

        return (
            <>
                <div class='relative center pb-3 border-b border-gray-400'> {/* Add fade-in here */}
                    <span class='block text-2xl text-amber-500 font-sans'>You splurged the most on</span>
                    <span class='block font semi-bold text-6xl text-red-500 pt-3'>{max.y}</span>
                </div>
                <div class='relative pt-5'>
                    <span class='block text-2xl text-amber-500 font-medium font-sans'>Spending</span>
                    <span class='block font-sans semi-bold text-6xl text-red-500'>${max.x}</span>
                    <span class='text-2xl text-amber-500 font-medium font-sans'>on it this year</span>
                </div>
            </>
        );

    }

    displayGraph = () => {
        if (this.state.foodData[0] > 0 && this.state.otherData[0] > 0 && this.state.subscriptionsData[0] > 0 &&
            this.state.transportationData[0] > 0 && this.state.utilityData[0] > 0) {
            const graphData = this.mergeData();

            return (
                <XYPlot yType="ordinal" width={500} height={400} margin={{ left: 120, top: 30 }}>
                    <YAxis />
                    <HorizontalBarSeries data={graphData} />
                    <LabelSeries data={graphData} getLabel={d => `$${d.x}`} />
                </XYPlot>
            )
        } else {
            return <span class='animation-pulse font-sans text-teal-600 text-5xl'>Please wait as the data loads</span>;
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div class='flex justify-evenly bg-white w-8/12 h-full rounded-xl shadow-md transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg'>
                    <span class='animation-pulse font-sans text-teal-600 text-5xl'>Please wait as the data loads</span>
                </div>
            );
        } else {
            return (
                <div class='flex justify-evenly bg-white w-8/12 h-8/12 rounded-xl shadow-md p-12 transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg overflow-scroll'>
                    <div class='flex flex-col w-5/12 mt-2 static p-5 transform scale-100 md:scale-75'>
                        {this.displayText()}
                    </div>
                    <div class='w-7/12 ml-3 transform scale-100 md:scale-90'>
                        {this.displayGraph()}
                    </div>
                </div>
            );
        }
    }
}