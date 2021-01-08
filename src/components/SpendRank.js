import React, { Component } from 'react';
import '../index.css';
import { XYPlot, HorizontalGridLines, LabelSeries, VerticalGridLines, YAxis, HorizontalBarSeries } from 'react-vis';
import sumArray from './SumArray';

const spendingCategories = [
    { y: "Food", x: 5100 },
    { y: "Utility", x: 846 },
    { y: "Transport", x: 1242 },
    { y: "Subscriptions", x: 708 },

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
            fetch("https://moneytreesapi.herokuapp.com/food/2"),
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

    findMax = (totalExp) => {
        var max = totalExp[0].y;
        for (var i = 1; i < totalExp.length(); i++) {
            if (totalExp[i].y > max) {
                max = totalExp[i].y;
            }
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
                <div class='flex justify-evenly bg-white w-8/12 h-8/12 rounded-xl shadow-md p-12 transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg'>
                    <div class='flex flex-col w-5/12 mt-2 static p-5 transform scale-100 md:scale-75'>
                        <div class='relative p-3'>
                            <span class='block text-3xl text-amber-500 font-medium font-sans'>You spent a total of</span>
                            <span class={`block font semi-bold text-6xl text-emerald-500`}>${this.state.totalExpenses}</span>
                            <span class='text-2xl text-amber-500 font-medium font-sans'>for the year</span>
                        </div>
                        <div class='relative p-3'>
                            <span class='block text-3xl text-amber-500 font-medium font-sans'>You really loved food and spent</span>
                            <span class='block font semi-bold text-6xl text-emerald-500'>${spendingCategories[0].x}</span>
                            <span class='text-2xl text-amber-500 font-medium font-sans'>on it</span>
                        </div>
                    </div>
                    <div class='w-7/12 ml-3 transform scale-100 md:scale-75'>
                        <XYPlot yType="ordinal" width={500} height={400} margin={{ left: 120, top: 30 }}>
                            {/* <VerticalGridLines />
                        <HorizontalGridLines /> */}
                            <YAxis />
                            <HorizontalBarSeries data={spendingCategories} />
                            <LabelSeries data={spendingCategories} getLabel={d => d.x} />
                        </XYPlot>
                    </div>
                </div>
            );
        }
    }
}