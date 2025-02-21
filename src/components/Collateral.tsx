import React, { useState } from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonTitle, IonContent, IonAlert } from '@ionic/react';
import * as XLSX from 'xlsx'; // Import XLSX for Excel export
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF export
import '../styles/Collateral.css';

const Collateral: React.FC = () => {
    const [collaterals, setCollaterals] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [newCollateral, setNewCollateral] = useState({ 
        name: '', 
        info: '', 
        percentage: '' 
    });

    // Function to add a new Collateral
    const addCollateral = () => {
        setShowAlert(true); // Show the IonAlert
    };

    // Function to handle the form submission
    const handleAddCollateral = (data: any) => {
        const { name, info, percentage } = data;

        // Validation for empty fields
        if (!name || !info || !percentage) {
            return; // Don't proceed if any of the fields are empty
        }

        // Add the new Collateral to the list
        setCollaterals((prevCollaterals) => [
            ...prevCollaterals,
            { name, info, percentage }
        ]);

        // Reset state and close the alert
        setShowAlert(false);
        setNewCollateral({ name: '', info: '', percentage: '' });
    };

    // Function to download as Excel
    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(collaterals);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Collaterals');
        XLSX.writeFile(wb, 'collaterals.xlsx');
    };

    // Function to download as PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Collaterals', 10, 10);

        // Add table header
        doc.text('Name', 10, 20);
        doc.text('Info', 60, 20);
        doc.text('Percentage (%)', 110, 20);

        // Add table rows
        collaterals.forEach((collateral, index) => {
            doc.text(collateral.name, 10, 30 + (index * 10));
            doc.text(collateral.info, 60, 30 + (index * 10));
            doc.text(collateral.percentage + '%', 110, 30 + (index * 10));
        });

        doc.save('collaterals.pdf');
    };

    return (
        <IonContent className="guarantor-page">
            {/* Wrapping the content in a centered div with box-shadow */}
            <div className="content-box">
                <IonGrid>
                    <IonRow className='heading'>
                        <IonCol size="6">
                            <IonTitle>Collaterals</IonTitle>
                        </IonCol>
                        <IonCol className="ion-text-right addCollateral">
                            <IonButton expand="block" onClick={addCollateral}>
                                + Add Collateral
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                {/* Table to display the list of collateral */}
                <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Info</th>
                            <th>Percentage (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collaterals.length === 0 ? (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center' }}>No collaterals added yet.</td>
                            </tr>
                        ) : (
                            collaterals.map((collateral, index) => (
                                <tr key={index}>
                                    <td>{collateral.name}</td>
                                    <td>{collateral.info}</td>
                                    <td>{collateral.percentage}%</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Download Buttons */}
                <IonRow style={{ marginTop: '20px' }}>
                    <IonCol size="6">
                        <IonButton expand="block" onClick={downloadExcel}>
                            Download as Excel
                        </IonButton>
                    </IonCol>
                    <IonCol size="6">
                        <IonButton expand="block" onClick={downloadPDF}>
                            Download as PDF
                        </IonButton>
                    </IonCol>
                </IonRow>

                {/* IonAlert for adding a new collateral */}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Add Collateral'}
                    inputs={[
                        {
                            name: 'name',
                            type: 'text',
                            placeholder: 'Collateral Name',
                            value: newCollateral.name,
                        },
                        {
                            name: 'info',
                            type: 'text',
                            placeholder: 'Collateral Info',
                            value: newCollateral.info,
                        },
                        {
                            name: 'percentage',
                            type: 'number',
                            placeholder: 'Percentage (%)',
                            value: newCollateral.percentage,
                        },
                    ]}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                setShowAlert(false);
                            },
                        },
                        {
                            text: 'OK',
                            handler: (data: any) => {
                                handleAddCollateral(data);
                            },
                        },
                    ]}
                />
            </div>
        </IonContent>
    );
};

export default Collateral;
