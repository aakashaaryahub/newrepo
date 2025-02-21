import React, { useState } from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonTitle, IonContent, IonAlert } from '@ionic/react';

const Documents: React.FC = () => {
    const [Documentss, setGuarantors] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [newGuarantor, setNewGuarantor] = useState({ name: '', info: '', percentage: '' });

    // Function to add a new document
    const addGuarantor = () => {
        setShowAlert(true); // Show the IonAlert
    };

    // Function to handle the form submission
    const handleAddGuarantor = () => {
        const { name, info, percentage } = newGuarantor;
        
        // Validation for empty fields
        if (!name || !info || !percentage) {
            return; // Don't proceed if any of the fields are empty
        }

        // Add the new document to the list
        setGuarantors((prevGuarantors) => [
            ...prevGuarantors, 
            { name, info, percentage }
        ]);

        // Reset state and close the alert
        setShowAlert(false);
        setNewGuarantor({ name: '', info: '', percentage: '' });
    };

    // Function to handle input changes manually
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setNewGuarantor((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <IonContent className="guarantor-page">
            {/* Wrapping the content in a centered div with box-shadow */}
            <div className="content-box">
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <IonTitle>Documents</IonTitle>
                        </IonCol>
                        <IonCol size="6" className="ion-text-right">
                            <IonButton expand="block" onClick={addGuarantor}>
                                + Add Documents
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                {/* Table to display the list of documents */}
                <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Info</th>
                            <th>Percentage (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Documentss.length === 0 ? (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center' }}>No documents added yet.</td>
                            </tr>
                        ) : (
                            Documentss.map((guarantor, index) => (
                                <tr key={index}>
                                    <td>{guarantor.name}</td>
                                    <td>{guarantor.info}</td>
                                    <td>{guarantor.percentage}%</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* IonAlert for adding a new document */}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Add Documents'}
                    inputs={[
                        {
                            name: 'name',
                            type: 'text',
                            placeholder: 'Documents Name',
                        },
                        {
                            name: 'info',
                            type: 'text',
                            placeholder: 'Documents Info',
                            value: newGuarantor.info, // Controlled input
                        },
                        {
                            name: 'percentage',
                            type: 'number',
                            placeholder: 'Percentage (%)',
                            value: newGuarantor.percentage, // Controlled input
                        },
                    ]}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => setShowAlert(false),
                        },
                        {
                            text: 'Add',
                            handler: handleAddGuarantor, // Submit the form when 'Add' is pressed
                        },
                    ]}
                />
            </div>
        </IonContent>
    );
};

export default Documents;
