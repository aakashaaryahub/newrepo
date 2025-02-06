import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Home from './Home.jsx';
import MyLoans from './MyLoans.jsx';
import NewLoan from './NewLoan.jsx';
import Repayments from './Repayments.jsx';

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "my-loans",
        element: <MyLoans />,
      },
      {
        path: "new-loan",
        element: <NewLoan />,
      },
      {
        path: "repayments",
        element: <Repayments />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
