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
  IonButton,
  IonIcon,
  IonModal,
  IonLoading
} from '@ionic/react';
import { trashOutline, pencilOutline, closeOutline, addCircleOutline } from 'ionicons/icons';
import '../styles/NewLoanScreen.css';
import Loading from '../components/Loading';

const NewLoanScreen: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<string>('Basic Details');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newFieldData, setNewFieldData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuperadmin, setIsSuperadmin] = useState<boolean>(true); // State for checking super admin

  useEffect(() => {
    fetch('/data/form_data.json')
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error('Error loading JSON data:', error));

    // Example: Set isSuperadmin (this can be set from an API response or context)
    setIsSuperadmin(true); // This is just for demonstration; you can set this from API or context
  }, []);

  if (!jsonData) {
    return <Loading />;
  }

  const handleTabChange = (e: any) => {
    setSelectedTab(e.detail.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewFieldData(null);
    setIsEditing(false);
    setFormError(null);
  };

  const validateFieldData = (): boolean => {
    if (!newFieldData?.label) {
      setFormError('Field Label is required.');
      return false;
    }

    if (newFieldData?.type === 'ddl' && (!newFieldData.ddlItems || newFieldData.ddlItems.length === 0)) {
      setFormError('Dropdown items are required.');
      return false;
    }

    setFormError(null);
    return true;
  };

  const handleAddField = (groupIndex: number) => {
    setNewFieldData({ groupIndex });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditField = (groupIndex: number, fieldIndex: number) => {
    const fieldToEdit = jsonData.tabs.find((tab: any) => tab.tabName === selectedTab)
      .formGroupItems[groupIndex].items[fieldIndex];

    setNewFieldData({
      ...fieldToEdit,
      groupIndex,
      fieldIndex
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const saveNewField = () => {
    if (!validateFieldData()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const updatedJsonData = { ...jsonData };
      const group = updatedJsonData.tabs.find((tab: any) => tab.tabName === selectedTab)
        .formGroupItems[newFieldData.groupIndex];

      const newField = {
        label: newFieldData.label || 'New Field',
        type: newFieldData.type || 'text',
        validations: [],
        ddlItems: newFieldData.ddlItems || []
      };

      if (isEditing) {
        group.items[newFieldData.fieldIndex] = newField;
      } else {
        group.items.push(newField);
      }

      setJsonData(updatedJsonData);
      setLoading(false);
      handleCloseModal();
    }, 2000);
  };

  const handleDeleteField = (groupIndex: number, fieldIndex: number) => {
    const updatedJsonData = { ...jsonData };
    const group = updatedJsonData.tabs.find((tab: any) => tab.tabName === selectedTab)
      .formGroupItems[groupIndex];

    group.items.splice(fieldIndex, 1);
    setJsonData(updatedJsonData);
  };

  const handleNextTab = () => {
    const currentTabIndex = jsonData.tabs.findIndex((tab: any) => tab.tabName === selectedTab);
    const nextTabIndex = (currentTabIndex + 1) % jsonData.tabs.length;  // Loop to the first tab if it's the last one
    const nextTab = jsonData.tabs[nextTabIndex];
  
    if (nextTab?.show) {
      setSelectedTab(nextTab.tabName);  // Change to next tab
    }
  };
  

  // Add a new form group
  const handleAddFormGroup = () => {
    const updatedJsonData = { ...jsonData };
    const newGroup = {
      groupName: 'New Group',
      items: []
    };

    updatedJsonData.tabs.find((tab: any) => tab.tabName === selectedTab).formGroupItems.push(newGroup);
    setJsonData(updatedJsonData);
  };

  const renderFormItems = (tabName: string) => {
    const tab = jsonData.tabs.find((tab: any) => tab.tabName === tabName);

    return tab ? tab.formGroupItems.map((group: any, groupIndex: number) => (
      <IonCard key={groupIndex} className="form-card">
        <IonCardHeader className="form-card-header">
          <div className="group-header">
            <h3>{group.groupName}</h3>
            {isSuperadmin && ( // Conditionally show Add Field button
              <IonButton
                onClick={() => handleAddField(groupIndex)}
                className="add-field-btn"
              >
                Add Field
              </IonButton>
            )}
          </div>
        </IonCardHeader>
        <IonCardContent className="form-card-content">
          {group.items.map((item: any, index: number) => {
            return (
              <IonItem key={index} className="form-item">
                <IonLabel className="form-label" position="stacked">
                  {item.label}
                  {isSuperadmin && ( // Conditionally show Edit and Delete buttons
                    <>
                      <IonButton
                        fill="clear"
                        className="icon-btn"
                        onClick={() => handleEditField(groupIndex, index)}
                      >
                        <IonIcon icon={pencilOutline} />
                      </IonButton>
                      <IonButton
                        fill="clear"
                        className="icon-btn"
                        onClick={() => handleDeleteField(groupIndex, index)}
                      >
                        <IonIcon icon={trashOutline} />
                      </IonButton>
                    </>
                  )}
                </IonLabel>

                {item.type === 'text' || item.type === 'number' ? (
                  <IonInput type={item.type} className="input-field" />
                ) : item.type === 'ddl' ? (
                  <IonSelect className="select-field">
                    {item.ddlItems.map((ddlItem: string, i: number) => (
                      <IonSelectOption key={i} value={ddlItem}>
                        {ddlItem}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                ) : item.type === 'file' ? (
                  <input type="file" className="file-input" />
                ) : item.type === 'date' ? (
                  <IonInput type="date" className="input-field" />
                ) : null}
              </IonItem>
            );
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
        <IonSegment value={selectedTab} onIonChange={handleTabChange} className="segment">
          {jsonData.tabs.map((tab: any, index: number) => tab.show && (
            <IonSegmentButton key={index} value={tab.tabName}>
              <IonLabel>{tab.tabName}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        {renderFormItems(selectedTab)}

        <IonButton expand="full" onClick={handleNextTab}>Submit Application</IonButton>

        <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle color={'light'}>{isEditing ? 'Edit Field' : 'Add New Field'}</IonTitle>
              <IonButton slot="end" onClick={handleCloseModal} fill="clear" color="light">
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="modal-content">
            <IonItem>
              <IonLabel position="stacked">Field Label</IonLabel>
              <IonInput
                value={newFieldData?.label || ''}
                onIonChange={(e) => setNewFieldData({ ...newFieldData, label: e.detail.value })}
                placeholder="Enter field label"
              />
            </IonItem>

            {formError && <div className="error-message">{formError}</div>}

            <IonItem>
              <IonLabel position="stacked">Field Type</IonLabel>
              <IonSelect
                value={newFieldData?.type || 'text'}
                onIonChange={(e) => setNewFieldData({ ...newFieldData, type: e.detail.value })}
              >
                <IonSelectOption value="text">Text</IonSelectOption>
                <IonSelectOption value="number">Number</IonSelectOption>
                <IonSelectOption value="ddl">Dropdown</IonSelectOption>
                <IonSelectOption value="file">File</IonSelectOption>
                <IonSelectOption value="date">Date</IonSelectOption>
              </IonSelect>
            </IonItem>

            {newFieldData?.type === 'ddl' && (
              <IonItem>
                <IonLabel position="stacked">Dropdown Items</IonLabel>
                <IonInput
                  value={newFieldData?.ddlItems || ''}
                  onIonChange={(e) => setNewFieldData({ ...newFieldData, ddlItems: e.detail.value?.split(',') })}
                  placeholder="Enter items, comma-separated"
                />
              </IonItem>
            )}

            <IonButton expand="full" onClick={saveNewField}>
              {isEditing ? 'Save Changes' : 'Save Field'}
            </IonButton>
          </IonContent>
        </IonModal>

        <IonLoading
          isOpen={loading}
          message={'Saving...'}
          duration={0}
        />

      </IonContent>
    </IonPage>
  );
};

export default NewLoanScreen;
