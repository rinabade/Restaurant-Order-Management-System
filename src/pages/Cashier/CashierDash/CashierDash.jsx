import React from "react";
import Cards from "../../../components/CashierComponent/Cards/Cards";
import Table from "../../../components/CashierComponent/Table/Table";
import "./CashierDash.css";
const CashierDash = () => {
  return (
    <div className="MainDash">
      <div className="mb-5 mt-5">
      <h1>Cashier Dashboard</h1>
      </div>
      <Cards />
      <Table />
    </div>
  );
};

export default CashierDash;
