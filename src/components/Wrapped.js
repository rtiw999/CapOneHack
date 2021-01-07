import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../wrapped.css";
import joe from "../pictures/AverageJoe.jpg"

export default class Wrapped extends Component {
  render() {
    return (
      <div className="container">
        <div className="grid grid-cols-6 gap-4">
          <div
            className="col-start-1 col-span-3 ..."
            style={{ backgroundColor: "red" , font: "Helvetica 20px bold italic"}}
          >
            Hello John,
          </div>
          <div
            className="col-start-1 col-span-3 ..."
            style={{ backgroundColor: "red" , font: "Helvetica 20px bold italic"}}
          >
            Your Yearly Finances, Wrapped Up:
          </div>
          <div
            className="col-start-2 col-end-3 ..."
            style={{ backgroundColor: "blue" }}
          >
            <img src={joe} alt="generic picture"/>
          </div>
          <div
            className="col-end-6 col-span-2 ..."
            style={{ backgroundColor: "green" }}
          >
            <h2 style={{textDecoration: "underline"}}>
              Top Sources of Income
            </h2>

            <h2 style={{textDecoration: "underline"}}>
              Largest Expenses
            </h2>
          </div>
          <div
            className="col-start-1 col-end-4 ..."
            style={{ backgroundColor: "gray" }}
          >
            Budgeting Goal: 
          </div>
        </div>
      </div>
    );
  }
}
