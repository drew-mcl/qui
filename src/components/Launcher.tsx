import * as React from 'react';

import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SuiteAndAppsTabs from './SuiteAndAppsTabs';
import SessionTable from './SessionTable';
import SuiteAppsContext from '../context/SuiteAppsContext';
import TextField from '@mui/joy/TextField';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useState } from 'react'; // Make sure to import useState
import SubmitSessionDialog from './SubmitSessionDialog';


type AppType = {
    id: string;
    name: string;
    version: string;
    group: string;
    phase: number; 
};

export default function Launcher() {
  const [apps, setApps] = React.useState<AppType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submissionName, setSubmissionName] = useState('');

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = () => {
    // Here you would send the data to the backend
    const dataToSend = {
      name: submissionName,
      apps: apps,
    };

    console.log('Sending to backend:', JSON.stringify(dataToSend));
    // You would use fetch or axios to send the data to your backend here

    handleCloseDialog();
  };

  return (
    <React.Fragment>
              <SuiteAppsContext.Provider value={{ apps, setApps }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="small" />}
                sx={{ pl: 0 }}
              >
                <Link
                  underline="none"
                  color="neutral"
                  href="#some-link"
                  aria-label="Home"
                >
                  <HomeRoundedIcon />
                </Link>
                <Typography color="primary" fontWeight={500} fontSize={12}>
                  Launcher
                </Typography>
              </Breadcrumbs>
            </Box>
            <Box
              sx={{
                display: 'flex',
                my: 1,
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'start', sm: 'center' },
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="h2">Dynamic Environment Builder</Typography>
              <SubmitSessionDialog />
            </Box>
    <Box sx={{
        display: 'flex',
        my: 1,
        gap: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens, row on larger screens
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 2, // Space between components
          }}
        >
          <SuiteAndAppsTabs />
          <SessionTable />
        </Box>
  </Box>
  </SuiteAppsContext.Provider>

  </React.Fragment>

  
  );
}

