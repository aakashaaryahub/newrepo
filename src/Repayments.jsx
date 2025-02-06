import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import "./repayments.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Repayments = () => {
  const [value, setValue] = useState(0);

  // Sample data for loans
  const data = [
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
    {
      date: "22nd Dec, 2024",
      amountToPay: "2000",
      principalAmount: "1,00,000",
      interest: "8.9%",
      latePenalty: "0.00",
      balance: "100",
      status: "Pending"

    },
  ];

  // Columns for table
  const columns = [
    { title: "Date", field: "date" },
    { title: "Amount to pay", field: "amountToPay" },
    { title: "Principal Amount", field: "principalAmount" },
    { title: "Interest", field: "interest" },
    { title: "Late Penalty", field: "latePenalty" },
    { title: "Balance", field: "balance" },
    { title: "Status", field: "status" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="repayment-container">
      <Box sx={{ width: "100%" }}>

        <TabContent value={value} index={0}>
          <Table sx={{ width: '100%', backgroundColor: "#444", color: "white" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field} sx={{ backgroundColor: "#555", color: "white" }}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.loanId}
                  sx={{
                    "&:nth-of-type(even)": { backgroundColor: "#555" },
                    "&:nth-of-type(odd)": { backgroundColor: "#666" },
                  }}
                >
                  <TableCell sx={{ color: "white" }}>{row.date}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.amountToPay}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.principalAmount}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.interest}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.latePenalty}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.balance}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabContent>
        <TabContent value={value} index={1}>
          Content for Tab 2
        </TabContent>
        <TabContent value={value} index={2}>
          Content for Tab 3
        </TabContent>
        <TabContent value={value} index={3}>
          Content for Tab 4
        </TabContent>
        {/* Add additional TabContent components for all other tabs */}
      </Box>
    </div>
  );
};

const TabContent = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default Repayments;
