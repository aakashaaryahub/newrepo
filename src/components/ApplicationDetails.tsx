import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonInput, IonLabel, IonItem, IonGrid, IonRow, IonCol } from '@ionic/react';
import '../styles/application_details.css'

const ApplicationDetails: React.FC = () => {

  // Example data for the table
  const tableData = [
    { id: 1, name: 'John Doe', age: 28, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles' },
    { id: 3, name: 'George Brown', age: 45, city: 'Chicago' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Application Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Form with 6 TextFields */}
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <IonItem>
                <IonLabel position="floating">First Name</IonLabel>
                <IonInput placeholder="Enter first name" />
              </IonItem>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonItem>
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput placeholder="Enter last name" />
              </IonItem>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput placeholder="Enter email" />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" sizeMd="4">
              <IonItem>
                <IonLabel position="floating">Phone Number</IonLabel>
                <IonInput placeholder="Enter phone number" />
              </IonItem>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonItem>
                <IonLabel position="floating">Address</IonLabel>
                <IonInput placeholder="Enter address" />
              </IonItem>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonItem>
                <IonLabel position="floating">City</IonLabel>
                <IonInput placeholder="Enter city" />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Table below the form using regular HTML table */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </IonContent>
    </IonPage>
  );
};

export default ApplicationDetails;
