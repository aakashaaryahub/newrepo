import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import '../styles/GuarantorDetails.css'; // For custom styles

const GuarantorPage = () => {
    const [guarantors, setGuarantors] = useState([]);

    // Function to add a new guarantor
    const addGuarantor = () => {
        Swal.fire({
            title: 'Add Guarantor',
            html: `
                <input id="guarantor-name" class="swal2-input" placeholder="Guarantor Name" />
                <input id="guarantor-info" class="swal2-input" placeholder="Guarantor Info" />
                <input id="guarantor-percentage" class="swal2-input" placeholder="Percentage (%)" type="number" />
            `,
            preConfirm: () => {
                const name = document.getElementById('guarantor-name').value;
                const info = document.getElementById('guarantor-info').value;
                const percentage = document.getElementById('guarantor-percentage').value;

                if (!name || !info || !percentage) {
                    Swal.showValidationMessage('All fields are required!');
                    return false;
                }

                return { name, info, percentage };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newGuarantor = result.value;
                setGuarantors((prevGuarantors) => [...prevGuarantors, newGuarantor]);
            }
        });
    };

    return (
        <div className="guarantor-page">
            <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <h1>Guarantors</h1>
                </Grid>
                <Grid item xs={12} sm={6} textAlign="right">
                    <Button variant="contained" color="primary" onClick={addGuarantor}>
                        + Add Guarantor
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Info</strong></TableCell>
                            <TableCell><strong>Percentage (%)</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guarantors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No guarantors added yet.</TableCell>
                            </TableRow>
                        ) : (
                            guarantors.map((guarantor, index) => (
                                <TableRow key={index}>
                                    <TableCell>{guarantor.name}</TableCell>
                                    <TableCell>{guarantor.info}</TableCell>
                                    <TableCell>{guarantor.percentage}%</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default GuarantorPage;
