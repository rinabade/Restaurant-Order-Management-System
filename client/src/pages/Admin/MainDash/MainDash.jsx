import React from "react";
import Cards from "../../../components/AdminComponent/Cards/Cards";
import Table from "../../../components/AdminComponent/Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="adminMainDash">
      <div className="mb-2 mt-5">
      <h1>Admin Dashboard</h1>
      </div>
      {/* <Cards /> */}
      <Table />
    </div>
  );
};

export default MainDash;
