import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import '../styles/Documents.css'; // For custom styles

const DocumentsPage = () => {
    const [documents, setCollaterals] = useState([]);

    // Function to add a new collateral item
    const addCollateral = () => {
        Swal.fire({
            title: 'Add Document',
            html: `
                <div>
                    <select id="collateral-type" class="swal2-input">
                        <option value="">Select Document Type</option>
                        <option value="Car">Car</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="House">House</option>
                    </select>
                    <input id="collateral-description" class="swal2-input" placeholder="Description" />
                    <input id="collateral-value" class="swal2-input" placeholder="Current Value" type="number" />
                </div>
            `,
            preConfirm: () => {
                const collateralType = document.getElementById('collateral-type').value;
                const description = document.getElementById('collateral-description').value;
                const value = document.getElementById('collateral-value').value;

                if (!collateralType || !description || !value) {
                    Swal.showValidationMessage('All fields are required!');
                    return false;
                }

                return { collateralType, description, value };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newCollateral = result.value;
                setCollaterals((prevCollaterals) => [...prevCollaterals, newCollateral]);
            }
        });
    };

    return (
        <div className="collateral-page">
            <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <h1>Documents</h1>
                </Grid>
                <Grid item xs={12} sm={6} textAlign="right">
                    <Button variant="contained" color="primary" onClick={addCollateral}>
                        + Add Document
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Document Type</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Current Value</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No documents added yet.</TableCell>
                            </TableRow>
                        ) : (
                            documents.map((collateral, index) => (
                                <TableRow key={index}>
                                    <TableCell>{collateral.collateralType}</TableCell>
                                    <TableCell>{collateral.description}</TableCell>
                                    <TableCell>${collateral.value}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DocumentsPage;
