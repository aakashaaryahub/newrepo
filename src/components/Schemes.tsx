import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonRouterLink, IonAlert } from '@ionic/react';
import '../styles/Schemes.css';

// Color palette to choose from for cards
const cardColors = ['#2ECC71', '#1ABC9C', '#E67E22', '#3498DB', '#E74C3C', '#F39C12', '#9B59B6', '#5DADE2', '#FF7F50', '#16A085'];

// Sample subscription data with categories
const subscriptionData = [
  { title: 'Scheme 1', description: 'Lorem Ipsum\n Lorem Ipsum \n mlfdjcn kfedjnc kj', link: '/folder/new-loann', category: 'Category A' },
  { title: 'Scheme 2', description: 'Lorem IpsumLorem Ipsum', link: '/scheme/2', category: 'Category B' },
  { title: 'Scheme 3', description: 'Lorem IpsumLorem IpsumLorem Ipsum', link: '/scheme/3', category: 'Category A' },
  { title: 'Scheme 4', description: 'Lorem Ipsum Lorem IpsumLorem IpsumLorem Ipsum', link: '/scheme/4', category: 'Category C' },
  { title: 'Scheme 5', description: 'Access to limited features.\n lofdekjnclek \n mlfdjcn kfedjnc kj', link: '/scheme/5', category: 'Category B' },
  { title: 'Scheme 6', description: 'Lorem IpsumLorem Ipsum', link: '/scheme/6', category: 'Category A' },
  { title: 'Scheme 7', description: 'Lorem IpsumLorem Ipsum', link: '/scheme/7', category: 'Category C' },
  { title: 'Scheme 8', description: 'Lorem Ipsum Lorem IpsumLorem IpsumLorem Ipsum', link: '/scheme/8', category: 'Category B' },
  { title: 'Scheme 9', description: 'Access to limited features.\n lofdekjnclek \n mlfdjcn kfedjnc kj', link: '/scheme/9', category: 'Category A' },
  { title: 'Scheme 10', description: 'Lorem IpsumLorem Ipsum', link: '/scheme/10', category: 'Category C' },
  { title: 'Scheme 11', description: 'Lorem IpsumLorem Ipsum', link: '/scheme/11', category: 'Category B' },
  { title: 'Scheme 12', description: 'Lorem Ipsum Lorem IpsumLorem IpsumLorem Ipsum', link: '/scheme/12', category: 'Category A' },
];

interface SchemesProps {
  filterCategory: string;
}

const Schemes: React.FC<SchemesProps> = ({ filterCategory }) => {
  const [isLoading, setIsLoading] = useState(true); // Initially loading is true
  const [filteredData, setFilteredData] = useState(subscriptionData);
  const [selectedCategory, setSelectedCategory] = useState<string>(filterCategory);
  const [showAlert, setShowAlert] = useState(false);
  const [redirectLink, setRedirectLink] = useState<string>('');

  // Dynamically fetching categories (this can be an API call or predefined array)
  const categories = Array.from(new Set(subscriptionData.map(item => item.category))); // Dynamically get unique categories

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    return cardColors[randomIndex];
  };

  // Apply filter based on selected category
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // After 2 seconds, set loading to false
    }, 2000);

    if (selectedCategory) {
      setFilteredData(subscriptionData.filter(scheme => scheme.category === selectedCategory));
    } else {
      setFilteredData(subscriptionData); // If no filter category, show all schemes
    }

    return () => clearTimeout(timer); // Cleanup the timeout when the component is unmounted
  }, [selectedCategory]);

  // Handle Apply Now button click
  const handleApplyClick = (link: string) => {
    setRedirectLink(link); // Set the link to redirect to
    setShowAlert(true); // Show the alert
  };

  return (
    <IonPage>
      <IonContent className="schemes_container">
        {/* Beautiful Loader */}
        {isLoading && (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        )}

        <IonGrid>
          <IonRow>
            {filteredData.map((plan, index) => (
              <IonCol key={index} size="12" size-md="6" size-lg="3">
                <IonRouterLink href={plan.link}>
                  <IonCard className={`subscription-card`} style={{ backgroundColor: getRandomColor() }}>
                    <IonCardHeader>
                      <IonCardTitle>{plan.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="card-content">
                      <p>{plan.description}</p>
                      <div className="custom-button" onClick={(e) => { e.preventDefault(); handleApplyClick(plan.link); }}>
                        Apply Now
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonRouterLink>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* IonAlert for Apply Now Confirmation */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirm'}
          message={'Applicants are advised to note that simply submitting the loan application, shall not make the applicant entitled to receive the loan and/or this does not create any privilege or right or claim on MPBCDC and the application shall be processed on a merit basis, subject to terms and conditions/guidelines as issued by the Government of India/Government of Maharashtra.'}
          buttons={[
            { 
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowAlert(false),
            },
            {
              text: 'Apply',
              handler: () => {
                // Redirect to the selected scheme's link
                window.location.href = redirectLink;
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Schemes;
