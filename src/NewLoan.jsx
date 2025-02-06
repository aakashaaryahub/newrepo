import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import "./repayments.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LoanDetails from "./loan_creation/jsx_components/LoanDetails";
import GuarantorPage from "./loan_creation/jsx_components/GuarantorDetails";
import Collateral from "./loan_creation/jsx_components/Collateral";
import DeductionsPage from "./loan_creation/jsx_components/DeductionsPage";
import Repayments from "./Repayments";
import DocumentsPage from "./loan_creation/jsx_components/DocumentsPage";
import LoanStatusPage from "./loan_creation/jsx_components/StatusPage";

const NewLoan = () => {

  const [value, setValue] = useState(0);

  // Sample data for loans
  const data = [
    { loanId: 1, name: "AA", },
    { loanId: 2, name: "BB", },
    { loanId: 3, name: "CC", },
    { loanId: 4, name: "DD", },
    { loanId: 4, name: "DD", },
    { loanId: 4, name: "DD", },
    { loanId: 4, name: "DD", },
    { loanId: 4, name: "DD", },
    { loanId: 4, name: "DD", },
    { loanId: 4, name: "DD", },
    { loanId: 4, name: "DD", },
  ];

  // Columns for table
  const columns = [
    { title: "Loan ID", field: "loanId" },
    { title: "Name", field: "name" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="repayment-container">
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable tabs example"
          sx={{
            boxShadow: "none", '&.Mui-selected': {
              color: "red"
            },
          }}
        >
          <Tab label="Loan Details" sx={{
            color: "white",
            width: "12rem",
            background: "transparent",
            '&.Mui-selected': {
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover effect
            }
          }} />
          <Tab label="Guarantor" sx={{
            color: "white",
            width: "12rem",
            background: "transparent",
            '&.Mui-selected': {
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover effect
            }
          }} />
          <Tab label="Collateral" sx={{
            color: "white",
            width: "12rem",
            background: "transparent",
            '&.Mui-selected': {
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover effect
            }
          }} />
          <Tab label="Deductions" sx={{
            color: "white",
            width: "12rem",
            background: "transparent",
            '&.Mui-selected': {
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover effect
            }
          }} />
          <Tab label="Repayment Schedule" sx={{
            color: "white",
            width: "12rem",
            background: "transparent",
            '&.Mui-selected': {
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover effect
            }
          }} />
          <Tab label="Documents" sx={{
            color: "white",
            width: "12rem",
            background: "transparent",
            '&.Mui-selected': {
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover effect
            }
          }} />
          <Tab label="Status" sx={{
            color: "white",
            width: "12rem",
            background: "transparent",
            '&.Mui-selected': {
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover effect
            }
          }} />
        </Tabs>
        <TabContent value={value} index={0}>
          {/* <Table sx={{ width: '100%', backgroundColor: "#444", color: "white" }} aria-label="simple table">
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
                  <TableCell sx={{ color: "white" }}>{row.loanId}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <LoanDetails />
        </TabContent>
        <TabContent value={value} index={1}>
          <GuarantorPage />
        </TabContent>
        <TabContent value={value} index={2}>
          <Collateral />
        </TabContent>
        <TabContent value={value} index={3}>
          <DeductionsPage />
        </TabContent>
        <TabContent value={value} index={4}>
          <Repayments />
        </TabContent>
        <TabContent value={value} index={5}>
          <DocumentsPage />
        </TabContent>
        <TabContent value={value} index={6}>
          <LoanStatusPage />
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

export default NewLoan;
