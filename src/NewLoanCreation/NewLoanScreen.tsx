import React, { useState, useEffect } from 'react';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton
} from '@ionic/react';
import '../styles/NewLoanScreen.css'; // Custom CSS file

// Sample JSON Data
const NewLoanScreen: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<string>('Basic Details'); // Default tab

  useEffect(() => {
    // Fetch JSON data
    fetch('/data/form_data.json')
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  if (!jsonData) {
    return <div>Loading...</div>;
  }

  // Handle tab change
  const handleTabChange = (e: any) => {
    setSelectedTab(e.detail.value);
  };

  // Render the form items for the selected tab
  const renderFormItems = (tabName: string) => {
    const tab = jsonData.tabs.find((tab: any) => tab.tabName === tabName);

    return tab ? tab.formGroupItems.map((group: any, groupIndex: number) => (
      <IonCard key={groupIndex} className="form-card">
        <IonCardHeader className="form-card-header">
          <h3>{group.groupName}</h3>
        </IonCardHeader>
        <IonCardContent className="form-card-content">
          {group.items.map((item: any, index: number) => {
            if (item.type === 'text' || item.type === 'number') {
              return (
                <IonItem key={index} className="form-item">
                  <IonLabel className="form-label" position="stacked">{item.label}</IonLabel>
                  <IonInput type={item.type} className="input-field" />
                </IonItem>
              );
            } else if (item.type === 'ddl') {
              return (
                <IonItem key={index} className="form-item">
                  <IonLabel className="form-label" position="stacked">{item.label}</IonLabel>
                  <IonSelect className="select-field">
                    {item.ddlItems.map((ddlItem: string, i: number) => (
                      <IonSelectOption key={i} value={ddlItem}>
                        {ddlItem}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              );
            } else if (item.type === 'file') {
              return (
                <IonItem key={index} className="form-item">
                  <IonLabel className="form-label" position="stacked">{item.label}</IonLabel>
                  <input type="file" className="file-input" />
                </IonItem>
              );
            } else if (item.type === 'date') {
              return (
                <IonItem key={index} className="form-item">
                  <IonLabel className="form-label" position="stacked">{item.label}</IonLabel>
                  <IonInput type="date" className="input-field" />
                </IonItem>
              );
            }
            return null;
          })}
        </IonCardContent>
      </IonCard>
    )) : null;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Loan Application</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content">
        {/* Dynamic Segment for Tab Navigation */}
        <IonSegment value={selectedTab} onIonChange={handleTabChange} className="segment">
          {jsonData.tabs.map((tab: any, index: number) => tab.show && (
            <IonSegmentButton key={index} value={tab.tabName}>
              <IonLabel>{tab.tabName}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        {/* Render Form Items for the selected tab */}
        {renderFormItems(selectedTab)}

        {/* Submit Button */}
        <IonButton expand="full" >Submit Application</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NewLoanScreen;
