import React, { useEffect, useState } from 'react'
import { XYPlot, HorizontalGridLines, LineSeries, VerticalGridLines, YAxis, XAxis } from 'react-vis';
import '../index.css';

var graphData = [
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
    { x: "Jan", y: 30 },
];

function mergeData(arr) {
    for (var i = 0; i <= 12; i++) {
        graphData[i].y = arr[i];
    }

    return graphData
}

export default function Prediction() {
    const [oneYearData, setOneYearData] = useState(-1);
    const [twoYearData, setTwoYearData] = useState(-1);
    const [budgetYearOne, setBudgetYO] = useState(false);
    const [budgetYearTwo, setBudgetYT] = useState(false);
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('https://moneytreesapi.herokuapp.com/difference/12'),
            fetch('https://moneytreesapi.herokuapp.com/difference/24')
        ]).then(response => {
            return Promise.all(response.map((res) => {
                return res.json();
            }))
        }).then(data => {
            setOneYearData(data[0].difference[12]);
            setTwoYearData(data[1].difference[24]);
            (data[0].difference[12] >= 0) ? setBudgetYO(true) : setBudgetYO(false);
            (data[1].difference[24] >= 0) ? setBudgetYT(true) : setBudgetYT(false);
            setPlotData(mergeData(data[0].difference));
        }).catch(err => console.log(err));
    })

    if (oneYearData == -1 && twoYearData == -1) {
        return <span class='animation-pulse font-sans text-teal-600 text-5xl'>Please wait as the data loads</span>;
    } else {
        return (
            <>
                <div class='flex justify-evenly bg-gray-200 w-6/12 h-40 mt-10 rounded-xl shadow-md p-12 transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg'>
                    <span class="block text-1xl text-amber-700 font-sans pr-4">Next month, you'll have a predicted net marginal income of</span>
                    <div class="flex justify-center">
                        <div class='border-r border-gray-400 pr-3'>
                            <span class={`font-sans semi-bold text-6xl text-${budgetYearOne ? 'green' : 'red'}-500`}>${Math.round(oneYearData * 100) / 100}</span>
                            <span class='block text-sm text-amber-500 font-sans bottom-1'>{budgetYearOne ? 'which is under budget!' : 'which is over budget.'} (Based on one year of data)</span>
                        </div>
                        <div class='pl-3'>
                            <span class={`font-sans semi-bold text-6xl text-${budgetYearTwo ? 'green' : 'red'}-500 `}>${Math.round(twoYearData * 100) / 100}</span>
                            <span class='block text-sm text-amber-500 font-sans bottom-1'>{budgetYearTwo ? 'which is under budget!' : 'which is over budget.'} (Based on two years of data)</span>
                        </div>
                    </div>
                </div>
                <div class='flex flex-col bg-white w-6/12 rounded-xl shadow-md p-12 transition ease-in duration-500 transform hover:scale-105 hover:shadow-lg'>
                    <XYPlot xType="ordinal" width={600} height={400} margin={{left: 60}}>
                        <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
                        <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
                        <XAxis
                            style={{
                                line: { stroke: '#ADDDE1' },
                                ticks: { stroke: '#ADDDE1' },
                                text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                            }}
                        />
                        <YAxis title="Money" />
                        <LineSeries
                            className="first-series"
                            data={plotData}
                            style={{
                                strokeLinejoin: 'round',
                                strokeWidth: 4
                            }}
                        />
                    </XYPlot>
                    <span class="block text-md text-amber-700 font-sans pr-4">The difference between your income and expenses over the past year</span>
                </div>
            </>
        );
    }
}