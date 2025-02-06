import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// Sample data for loans
const data = [
  { loanId: 1, name: "AA", age: 12, loanAmount: 5000, status: "Approved" },
  { loanId: 2, name: "BB", age: 30, loanAmount: 12000, status: "Pending" },
  { loanId: 3, name: "CC", age: 25, loanAmount: 7000, status: "Rejected" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },  { loanId: 1, name: "AA", age: 12, loanAmount: 5000, status: "Approved" },
  { loanId: 2, name: "BB", age: 30, loanAmount: 12000, status: "Pending" },
  { loanId: 3, name: "CC", age: 25, loanAmount: 7000, status: "Rejected" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },  { loanId: 1, name: "AA", age: 12, loanAmount: 5000, status: "Approved" },
  { loanId: 2, name: "BB", age: 30, loanAmount: 12000, status: "Pending" },
  { loanId: 3, name: "CC", age: 25, loanAmount: 7000, status: "Rejected" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },  { loanId: 1, name: "AA", age: 12, loanAmount: 5000, status: "Approved" },
  { loanId: 2, name: "BB", age: 30, loanAmount: 12000, status: "Pending" },
  { loanId: 3, name: "CC", age: 25, loanAmount: 7000, status: "Rejected" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 4, name: "DD", age: 40, loanAmount: 15000, status: "Approved" },
  { loanId: 5, name: "EE", age: 35, loanAmount: 8000, status: "Pending" }
];

// Columns for table
const columns = [
  { title: "Loan ID", field: "loanId" },
  { title: "Name", field: "name" },
  { title: "Age", field: "age" },
  { title: "Loan Amount", field: "loanAmount" },
  { title: "Status", field: "status" },
  { title: "Actions", field: "actions" } // Actions column for the button
];

const LoanStepper = () => {
  const steps = ['Application Submitted', 'Loan Approved', 'Funds Disbursed'];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const MyLoans = () => {
  // Handle action (show SweetAlert with stepper)
  const handleAction = (loanId) => {
    const timelineContent = document.createElement('div');

    // Create a div to mount the stepper component
    ReactDOM.render(<LoanStepper />, timelineContent);

    // Open SweetAlert2 with stepper component inside
    Swal.fire({
      title: 'Timeline of Actions',
      html: timelineContent,
      icon: 'info',
      confirmButtonText: 'OK',
      willClose: () => {
        // Clean up the React component after the modal closes
        ReactDOM.unmountComponentAtNode(timelineContent);
      }
    });
  };

  return (
    <>
      <div className="table_container">
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#333",
            width: '100%',
            maxHeight: '200vw', // Add maxHeight to enable scrolling
            overflow: 'auto', // Allow scrolling when content exceeds maxHeight
          }}
        >
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
                  <TableCell sx={{ color: "white" }}>{row.loanId}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.age}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.loanAmount}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.status}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAction(row.loanId)}
                    >
                      Action
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default MyLoans;
