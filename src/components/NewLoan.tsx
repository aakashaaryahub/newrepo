import React, { useState } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonSegmentButton, IonLabel, IonPage } from '@ionic/react';

// import LoanDetails from './LoanDetails'; // Example component for Loan Details tab
import Guarantor from './Guarantor';
import Collateral from './Collateral';
import Repayments from './Repayments';
import Deductions from './Deductions';
import Documents from './Documents';
import LoanDetails from './LoanDetails';

const NewLoan: React.FC = () => {
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState<string>('loandetails');

  const handleSegmentChange = (e: any) => {
    // Ensure the value is always defined
    const value = e.detail.value ?? 'loandetails'; // Fallback to 'loandetails' if value is undefined
    setSelectedTab(value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Loan</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Top Tab Navigation */}
        <IonSegment scrollable={true} value={selectedTab} onIonChange={handleSegmentChange}>
        <IonSegmentButton value="loandetails">
            <IonLabel>Loan Details</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="guarantor">
            <IonLabel>Guarantor</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="collateral">
            <IonLabel>Collateral</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="deduction">
            <IonLabel>Deductions</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="document">
            <IonLabel>Document</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="repayments">
            <IonLabel>Repayments</IonLabel>
          </IonSegmentButton>
          
        </IonSegment>

        {/* <div style={{ height: '350px' }}></div> */}

        {/* Tab Content */}
        {selectedTab === 'loandetails' && <LoanDetails />}
        {selectedTab === 'guarantor' && <Guarantor />}
        {selectedTab === 'collateral' && <Collateral />}
        {selectedTab === 'deduction' && <Deductions />}
        {selectedTab === 'document' && <Documents />}
        {selectedTab === 'repayments' && <Repayments />}
      </IonContent>
    </IonPage>
  );
};

export default NewLoan;
