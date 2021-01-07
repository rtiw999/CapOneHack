import React, { Component } from 'react';
import { XYPlot, HorizontalGridLines, LabelSeries, VerticalGridLines, XAxis, VerticalBarSeries } from 'react-vis';

import '../index.css'

const savingsTemp = [
    {x: "Jan", y: 60},
    {x: "Feb", y: -50},
    {x: "Mar", y: 40},
    {x: "Apr", y: 10},
    {x: "May", y: 15},
    {x: "Jun", y: -30},
    {x: "Jul", y: 50},
    {x: "Aug", y: 33},
    {x: "Sep", y: 25},
    {x: "Oct", y: -12},
    {x: "Nov", y: -13},
    {x: "Dec", y: -21},
]

const labels  = savingsTemp.map(d => ({
    x: d.x,
    y: d.y
}));

export default class AmountSaved extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountSaved: -500,
            savingsPerMonth: savingsTemp,
            isLoaded: false,
        }

        this.fadeText = this.fadeText.bind(this);
    }

    componentDidMount() {
        this.setState(() => ({ isLoaded : true }));
    }

    fadeText = (textColor, netPos) => {
        if (this.state.isLoaded) {
            return (
                <>
                    <div class='relative top-0 left-3 p-3'> {/* Add fade-in here */}
                        <span class='block text-3xl text-amber-500 font-medium font-sans'>You {netPos ? 'saved' : 'lost'}</span>
                        <span class={`block font semi-bold text-6xl text-${textColor}-500`}>${netPos ? this.state.amountSaved : (-1 * this.state.amountSaved)}</span>
                        <span class='block text-2xl text-amber-500 font-sans'>this year!</span>
                    </div>
                    <div class='relative top-5 left-3'>
                        <span class='block text-2xl text-amber-500 font-medium font-sans'>You {netPos ? 'saved' : 'lost'} the most in</span>
                        <span class={`block font semi-bold text-6xl text-${textColor}-500`}>{netPos ? 'January' : 'February'}</span>
                    </div>
                </>
            );
        } else
            return <p>Didn't work</p>
    }

    render() {
        const netPos = this.state.amountSaved > 0;
        const textColor = netPos ? 'green' : 'red';
        const graphColor = netPos ? "#47e664" : "#ed544a";

        return (
            <div class='flex justify-evenly bg-white w-8/12 h-full rounded-xl shadow-md transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg'>
                <div class='flex flex-col w-4/12 mt-4 ml-4 static p-5'>
                    {this.fadeText(textColor, netPos)}
                </div>
                <div class='w-8/12 mr-5'>
                    <XYPlot height={400} width={600} xType="ordinal" margin={{bottom: 70, top:20}}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <VerticalBarSeries data={this.state.savingsPerMonth} color={graphColor}/>
                        <LabelSeries data={labels} width={400}/>
                        <XAxis />
                    </XYPlot>
                </div>
            </div>
        );
    }
}