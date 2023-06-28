import React from "react";
import KitchenCards from "../../../components/KitchenComponent/KitchenCards/KitchenCards";
import Table from "../../../components/AdminComponent/Table/Table";
import "./KitchenDash.css";
const KitchenDash = () => {
  return (
    <div className="MainDash">
      <div className="mb-5 mt-5">
      <h1>Kitchen Dashboard</h1>
      </div>
      <KitchenCards />
      <Table />
    </div>
  );
};

export default KitchenDash;
