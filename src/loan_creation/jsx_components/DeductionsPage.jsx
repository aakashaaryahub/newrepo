import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import '../styles/Deductions.css'; // For custom styles

const DeductionPage = () => {
    const [deductions, setDeductions] = useState([]);

    // Function to add a new deduction
    const addDeduction = () => {
        Swal.fire({
            title: 'Add Deduction',
            html: `
                <div>
                    <select id="deduction-type" class="swal2-input">
                        <option value="">Select Deduction Type</option>
                        <option value="Processing Fee">Processing Fee</option>
                        <option value="Other Deduction">Other Deduction</option>
                    </select>
                    <input id="deduction-amount" class="swal2-input" placeholder="Amount" type="number" />
                </div>
            `,
            preConfirm: () => {
                const deductionType = document.getElementById('deduction-type').value;
                const amount = document.getElementById('deduction-amount').value;

                if (!deductionType || !amount) {
                    Swal.showValidationMessage('Both fields are required!');
                    return false;
                }

                return { deductionType, amount };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newDeduction = result.value;
                setDeductions((prevDeductions) => [...prevDeductions, newDeduction]);
            }
        });
    };

    return (
        <div className="deduction-page">
            <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <h1>Deductions</h1>
                </Grid>
                <Grid item xs={12} sm={6} textAlign="right">
                    <Button variant="contained" color="primary" onClick={addDeduction}>
                        + Add Deduction
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Deduction Type</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deductions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">No deductions added yet.</TableCell>
                            </TableRow>
                        ) : (
                            deductions.map((deduction, index) => (
                                <TableRow key={index}>
                                    <TableCell>{deduction.deductionType}</TableCell>
                                    <TableCell>${deduction.amount}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DeductionPage;
