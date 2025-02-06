import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'; // Importing Material UI Dialog components
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation

function Header({ OpenSidebar }) {
  // State for handling dialog open/close
  const [openDialog, setOpenDialog] = useState(false);

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  // Function to handle dialog open
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  // Function to handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    // For now, we will just log out to console
    console.log("User logged out");

    setOpenDialog(false); // Close dialog after logout

    // Clear any user data like tokens (optional, if required)
    // localStorage.removeItem('userToken'); // Example of clearing token

    // Redirect to login page
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
     
      <div className="header-right">
        {/* BsPersonCircle icon triggers the dialog */}
        <BsPersonCircle className="icon" onClick={handleDialogOpen} />
      </div>

      {/* Dialog Component */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          {/* Logout message */}
          <p>Are you sure you want to log out?</p>
        </DialogContent>
        <DialogActions>
          {/* Close the dialog */}
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          {/* Logout button */}
          <Button onClick={handleLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}

export default Header;
