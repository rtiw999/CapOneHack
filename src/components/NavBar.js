import React, { useState, useEffect } from "react";
import '../index.css'

export default function Navbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch('https://moneytreesapi.herokuapp.com/name')
      .then(res => res.json())
      .then(data => setName(data.name))
      .catch(err => console.error(err));
  })

  return (
    <div class="container mx-auto bg-emerald-300 p-5">
      <nav class="flex justify-between">
        <div>
          <span class='font-sans text-gray-800 text-lg'>MoneyTree</span>
        </div>
        <div class='transition ease-in duration-300 transform hover:scale-102 hover:shadow-md hover:bg-emerald-100 rounded-md w-15 h-7'>
          <a target="_blank" rel="noopener noreferrer" href="https://www.capitalone.com" class='font-sans text-gray-600 text-1xl'>Welcome, {name}</a>
        </div>
      </nav>
    </div>
  );
}