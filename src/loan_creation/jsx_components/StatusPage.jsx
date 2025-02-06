import React from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/joy/Box';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import '../styles/StatusPage.css'; // Import the styles for StatusPage

const StatusPage = () => {

  const [activeStep, setActiveStep] = React.useState(0);

    return (
        <div className="status-page">
            <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <h1>Status</h1>
                </Grid>
            </Grid>

            <Box sx={{ display: 'grid',marginTop:'2rem', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Stepper orientation="vertical" sx={{ width: 200 }} activeStep={activeStep}>
                    <Step
                        indicator={
                            <StepIndicator variant="solid" color={activeStep >= 0 ? 'success' : 'neutral'}>
                                1
                            </StepIndicator>
                        }
                    >
                        Loan request initiated
                    </Step>
                    <Step
                        indicator={
                            <StepIndicator variant="solid" color={activeStep >= 1 ? 'success' : 'neutral'}>
                                2
                            </StepIndicator>
                        }
                    >
                        In review
                    </Step>
                    <Step
                        indicator={
                            <StepIndicator variant="solid" color={activeStep >= 2 ? 'success' : 'neutral'}>
                                3
                            </StepIndicator>
                        }
                    >
                        Approved
                    </Step>
                </Stepper>

             
            </Box>
        </div>
    );
};

export default StatusPage;
