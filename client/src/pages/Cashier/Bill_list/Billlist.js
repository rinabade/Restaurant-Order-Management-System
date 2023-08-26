import React, { useEffect, useState } from "react";
import "./Billlist.css";
import { FaPrint } from "react-icons/fa";
import io from "socket.io-client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import { getPaymentDetail } from "../../../api/userAction";


const Billlist = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [cashTotal, setCashTotal] = useState(0);
  const [fonepayTotal, setFonepayTotal] = useState(0);


  useEffect(() => {
    const storedOrders = localStorage.getItem("cashierOrders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cashierOrders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() =>{
    getPaymentDetail()
    .then((response) => {
      setData(response.data.data)
    })
  },[])
  useEffect(() => {
    // Calculate cash and fonepay totals
    let cashTotal = 0;
    let fonepayTotal = 0;
    data.forEach((dataItem) => {
      if (dataItem.payment_method === "cash") {
        cashTotal += dataItem.Total_price;
      } else if (dataItem.payment_method === "fonepay") {
        fonepayTotal += dataItem.Total_price;
      }
    });
    setCashTotal(cashTotal);
    setFonepayTotal(fonepayTotal);
  }, [data]);

  const grandTotal = cashTotal + fonepayTotal;

  return (
    <div className="Dailypayment">
      <div className="title-icon mb-5 mt-5 dflex">
        <h3>Daily Report</h3>
      </div>

      <div className="BillDetails">
        <TableContainer component={Paper}>
          <Table className="bill-tab">
            <TableHead>
              <TableRow className="orderrow">
              <TableCell className="border">S.No.</TableCell>
                <TableCell className="border">Table Number</TableCell>
                <TableCell className="border">Payment method</TableCell>
                <TableCell className="border">Transaction Code</TableCell>
                <TableCell className="border">Payment Date</TableCell>
                <TableCell align="left" className="border">
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dataItem,index) => (
                <TableRow key={dataItem.payment_id} className="border">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="border">{dataItem.table_number}</TableCell>
                  <TableCell className="border">{dataItem.payment_method}</TableCell>
                  <TableCell className="border">{dataItem.transactionCode}</TableCell>
                  <TableCell className="border">{dataItem.createdAt}</TableCell>
                  <TableCell align="left" className="border">
                    <span className="status" >{dataItem.Total_price}</span>
                  </TableCell>
                </TableRow>
              ))}
                 {/*cash payment */}
                 <TableRow>
                <TableCell colSpan={4}></TableCell>
                <TableCell className="total-cell">Cash Payment Total:</TableCell>
                <TableCell align="left" className="border">
                  <span className="status-total">{cashTotal}</span>
                </TableCell>
              </TableRow>
              {/*fonepay payment */}
              <TableRow>
                <TableCell colSpan={4}></TableCell>
                <TableCell className="total-cell">Fonepay Payment Total:</TableCell>
                <TableCell align="left" className="border">
                  <span className="status-total">{fonepayTotal}</span>
                </TableCell>
              </TableRow>
              {/*grand total */}
              <TableRow>
                <TableCell colSpan={4}></TableCell>
                <TableCell className="grandtotal-cell">Grand Total:</TableCell>
                <TableCell align="left" className="border">
                  <span className="grandstatus-total">{grandTotal}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Billlist;
