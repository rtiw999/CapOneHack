import React from 'react'
import '../index.css';

// props: textColor (so far, have to insert it into the div class for any component you're using)
export function Card(props) {

    return (
        <div class='flex justify-evenly bg-white w-8/12 h-8/12 rounded-xl shadow-md p-12 transition ease-in duration-500 transform hover:scale-105'>
            {/* This is where you'll put all of the information onto the card. You'll have to add your own divs and everything. */}
        </div>
    );
}