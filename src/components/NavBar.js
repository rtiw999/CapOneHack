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
        <div>
          <span class='font-sans text-gray-600 text-1xl'>Welcome, {name}</span>
        </div>
      </nav>
    </div>
  );
}