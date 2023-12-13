// SubmitSessionDialog.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import SuiteAppsContext from '../context/SuiteAppsContext'; // Import the context
import AutoModeIcon from '@mui/icons-material/AutoMode';


export default function SubmitSessionDialog() {
  const [open, setOpen] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const { apps } = useContext(SuiteAppsContext); // Use the context to access the apps state

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submissionData = {
      sessionName,
      apps,
    };

    console.log("sending to backend", submissionData)
    try {
     // const response = await axios.post('YOUR_BACKEND_ENDPOINT', submissionData);
     //console.log('Data successfully sent to backend:', response.data);
      // Add any post-submission logic here
    } catch (error) {
      console.error('An error occurred while sending data to the backend:', error);
    }

    handleCloseDialog();
  };

  return (
    <React.Fragment>
      <Button
        color="primary"
        startDecorator={<AutoModeIcon />}
        size="sm"
        onClick={handleOpenDialog}
      >
        Submit Session
      </Button>
      <Modal open={open} onClose={handleCloseDialog}>
        <ModalDialog>
          <DialogTitle>Submit Session</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Session Name</FormLabel>
                  <Input
                    autoFocus
                    required
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={2}>
                  <Button variant="outlined" color="neutral" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </Stack>
              </Stack>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
