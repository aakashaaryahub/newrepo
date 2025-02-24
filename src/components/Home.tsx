import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel, IonSegmentButton, IonSegment } from '@ionic/react';
import { statsChart } from 'ionicons/icons';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import '../styles/Home.css';
import Loading from './Loading'; // Assuming you have a separate Loading component

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

function Home() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Simulate a 2-second loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set to 2 seconds

    // Fetch the JSON data from the public folder
    fetch('/data/dashboard_data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch JSON');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setError(null); // Reset error if data is successfully fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      });

    // Clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  // Ensure that data is loaded before accessing
  if (loading) return <Loading />; // Show loader for 2 seconds

  if (error) return <div>{error}</div>;

  // Get the first section from the data (Section1)
  const section1 = data.sections.find((section: any) => section.name === 'Section1');

  // Get the second section from the data (Loan Trends)
  const loanTrends = data.sections.find((section: any) => section.name === 'Loan Trends');

  // Prepare dynamic chart data from "Loan Trends" section
  const lineChartData = loanTrends?.elements.find((el: any) => el.name === 'Loan Amount Over Time')?.data || [];
  const barChartData = loanTrends?.elements.find((el: any) => el.name === 'Overdue Loans')?.data || [];

  // Set chart data
  const lineChartConfig = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Placeholder labels (use dynamic labels if needed)
    datasets: [
      {
        label: 'Loan Amount Over Time',
        data: lineChartData,
        borderColor: '#4BC0C0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const barChartConfig = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Placeholder labels (use dynamic labels if needed)
    datasets: [
      {
        label: 'Overdue Loans',
        data: barChartData,
        backgroundColor: '#FF5733',
      },
    ],
  };

  // Get the table data (User Data section)
  const userData = data.sections.find((section: any) => section.name === 'User Data');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DASHBOARD</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="main-container">
        <div className="main-cards">
          {/* Map over elements in Section1 to render dynamic cards */}
          {section1?.elements.map((element: any, index: number) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle className="card-title">{element.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonIcon icon={statsChart} className="card_icon" />
                <h1>{element.value}</h1>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <IonCard className="chart-card">
            <IonCardHeader>
              <IonCardTitle className="card-title">Loan Amount Over Time</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <Line data={lineChartConfig} />
            </IonCardContent>
          </IonCard>

          <IonCard className="chart-card">
            <IonCardHeader>
              <IonCardTitle className="card-title">Overdue Loans</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <Bar data={barChartConfig} />
            </IonCardContent>
          </IonCard>
        </div>

        {/* Dynamically Render User Data Table */}
        <table className="table">
          <thead>
            <tr>
              {userData?.elements[0]?.columns.map((column: string, index: number) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData?.elements[0]?.rows.map((row: any, index: number) => (
              <tr key={index}>
                {userData?.elements[0]?.columns.map((column: string, colIndex: number) => (
                  <td key={colIndex}>{row[column.toLowerCase()]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </IonContent>
    </IonPage>
  );
}

export default Home;
