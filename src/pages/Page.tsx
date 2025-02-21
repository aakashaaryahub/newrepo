import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonModal, IonButton, IonSelect, IonSelectOption, IonList } from '@ionic/react';
import { useState } from 'react';
import { filter } from 'ionicons/icons';  // Import the filter icon
import './Page.css';
import NewLoan from '../components/NewLoan';
import ApplicationDetails from '../components/ApplicationDetails';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Schemes from '../components/Schemes';
import { useParams } from 'react-router';
import NewLoanScreen from '../NewLoanCreation/NewLoanScreen';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();

  // State for managing the filter modal
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');  // Store selected category

  // Toggle the filter modal
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle applying the filter (this would be tied to the filter logic in Schemes)
  const applyFilter = () => {
    console.log('Filter applied with category:', selectedCategory);
    setIsFilterOpen(false);
  };

  // Conditional content based on the name parameter
  const renderContent = () => {
    switch (name) {
      case 'home':
        return <Home />;
      case 'schemes':
        return <Schemes filterCategory={selectedCategory} />;  // Pass selectedCategory to Schemes
      case 'new-loann': 
        return <NewLoanScreen />;
      case 'application-details':
        return <ApplicationDetails />;
      case 'dashboard':
        return <Dashboard />;
      case 'new-loan':
        return <NewLoan />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <IonPage>
      <IonHeader className="custom-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle color={'light'}>{name}</IonTitle>
          {/* Add a filter icon if the name is "schemes" */}
          {name === 'schemes' && (
            <IonButtons slot="end">
              <IonIcon icon={filter} color="light" onClick={toggleFilter} />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Dynamically render content based on the name */}
        {renderContent()}

        {/* Filter Modal */}
        <IonModal isOpen={isFilterOpen} onDidDismiss={toggleFilter}>
          <div className="filter-modal-content" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h3>Filter Options</h3>
            <IonList>
              <IonSelect value={selectedCategory} onIonChange={e => setSelectedCategory(e.detail.value)} label="Select Category">
                <IonSelectOption value="">All Categories</IonSelectOption>
                <IonSelectOption value="Category A">Category A</IonSelectOption>
                <IonSelectOption value="Category B">Category B</IonSelectOption>
                <IonSelectOption value="Category C">Category C</IonSelectOption>
              </IonSelect>
            </IonList>
            <div style={{ marginTop: '20px' }}>
              <IonButton expand="block" onClick={applyFilter}>Apply Filter</IonButton>
              <IonButton expand="block" color="light" onClick={toggleFilter} style={{ marginTop: '10px' }}>Close</IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Page;
