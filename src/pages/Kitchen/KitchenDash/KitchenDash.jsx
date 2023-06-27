import React from "react";
import Cards from "../../../components/AdminComponent/Cards/Cards";
import Table from "../../../components/AdminComponent/Table/Table";
import "./KitchenDash.css";
const KitchenDash = () => {
  return (
    <div className="MainDash">
      <div className="mb-5 mt-5">
      <h1>Kitchen Dashboard</h1>
      </div>
      <Cards />
      <Table />
    </div>
  );
};

export default KitchenDash;
