import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../wrapped.css";
import "../index.css"
import joe from "../pictures/AverageJoe.jpg";

export default class Wrapped extends Component {
  render() {
    return (
      <div class="container">
        <div class="grid grid-cols-6 gap-4">
          <div
            class="col-start-1 col-span-3 ..."
            // style={{
            //   backgroundColor: "red",
            //   font: "Helvetica 20px bold italic",
            // }}
          >
            Hello John,
          </div>
          <div
            class="col-start-1 col-span-3 ..."
            // style={{
            //   backgroundColor: "red",
            //   font: "Helvetica 20px bold italic",
            // }}
          >
            Your Yearly Finances, Wrapped Up:
          </div>
          <div
            class="col-start-2 col-end-3 ..."
            // style={{ backgroundColor: "blue" }}
          >
            <img src={joe} alt="generic picture" />
          </div>

          <div
            class="col-end-6 col-span-2 ..."
          >
            <h2
              class="text-red-500 font-sans"
            >
              Top Sources of Income
            </h2>

            {/* <h2 style={{ textDecoration: "underline" }}>Largest Expenses</h2> */}
          </div>
          <div
            class="col-start-1 col-end-4 ..."
            // style={{ backgroundColor: "gray" }}
          >
            Budgeting Goal:
          </div>
        </div>
      </div>
    );
  }
}
