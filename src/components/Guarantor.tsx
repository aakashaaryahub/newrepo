import React, { useState } from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonTitle, IonContent, IonAlert } from '@ionic/react';

const Guarantor: React.FC = () => {
    const [guarantors, setGuarantors] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [newGuarantor, setNewGuarantor] = useState({ name: '', info: '', percentage: '' });

    // Function to add a new guarantor
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

        // Add the new guarantor to the list
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
                            <IonTitle>Guarantors</IonTitle>
                        </IonCol>
                        <IonCol size="6" className="ion-text-right">
                            <IonButton expand="block" onClick={addGuarantor}>
                                + Add Guarantor
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                {/* Table to display the list of guarantors */}
                <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Info</th>
                            <th>Percentage (%)</th>
                            <th>Percentage (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guarantors.length === 0 ? (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center' }}>No guarantors added yet.</td>
                            </tr>
                        ) : (
                            guarantors.map((guarantor, index) => (
                                <tr key={index}>
                                    <td>{guarantor.name}</td>
                                    <td>{guarantor.info}</td>
                                    <td>{guarantor.percentage}%</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* IonAlert for adding a new guarantor */}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Add Guarantor'}
                    inputs={[
                        {
                            name: 'name',
                            type: 'text',
                            placeholder: 'Guarantor Name',
                        },
                        {
                            name: 'info',
                            type: 'text',
                            placeholder: 'Guarantor Info',
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

export default Guarantor;
