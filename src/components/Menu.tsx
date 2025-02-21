import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  archiveOutline,
  archiveSharp,
  settingsOutline,
  settingsSharp,
  personCircleOutline,
  personCircleSharp,
  notificationsOutline,
  notificationsSharp,
  homeOutline,
  homeSharp,
  paperPlaneOutline,
  paperPlaneSharp,
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  subMenu?: AppPage[]; // Optional submenus for dynamic content
}

const appPages: AppPage[] = [
  {
    title: 'Dashboard',
    url: '/folder/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: 'Schemes',
    url: '/folder/schemes',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: 'Application Details',
    url: '/folder/application-details',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneOutline,
  },
  {
    title: 'New Loan',
    url: '/folder/new-loan',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneOutline,
  },
  
];

// Sample dynamic accordion content
const accordionData = [
  {
    title: 'Notifications',
    content: [
      { title: 'NF1' },
      { title: 'NF2' },
      { title: 'NF3' },
    ],
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>MPBCDC</IonListHeader>
          <IonNote>Some Description</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false} >
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>

                {/* Render submenus (e.g., Settings submenu) dynamically */}
                {appPage.subMenu && (
                  <IonAccordionGroup>
                    {appPage.subMenu.map((submenu, subIndex) => (
                      <IonAccordion key={subIndex}>
                        <div slot="header">
                          <IonItem
                            className={location.pathname === submenu.url ? 'selected' : ''}
                            routerLink={submenu.url}
                            routerDirection="none"
                            lines="none"
                          >
                            <IonIcon
                              aria-hidden="true"
                              slot="start"
                              ios={submenu.iosIcon}
                              md={submenu.mdIcon}
                            />
                            <IonLabel>{submenu.title}</IonLabel>
                          </IonItem>
                        </div>
                      </IonAccordion>
                    ))}
                  </IonAccordionGroup>
                )}
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* Render dynamic accordions */}
        <IonAccordionGroup>
          {accordionData.map((accordion, accordionIndex) => (
            <IonAccordion key={accordionIndex}>
              <div slot="header">
                <IonItem>
                  <IonIcon slot="start" ios={notificationsSharp} md={notificationsSharp}></IonIcon>
                  <IonLabel>{accordion.title}</IonLabel>
                </IonItem>
              </div>
              <IonList slot="content">
                {accordion.content.map((child, childIndex) => (
                  <IonItem key={childIndex}>
                    <IonLabel>{child.title}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
