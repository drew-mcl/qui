import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface KeyDetailsProps {
  selectedKey: string;
}

const KeyDetailsComponent: React.FC<KeyDetailsProps> = ({ selectedKey }) => {
  return (
    <Box sx={{ maxWidth: 360, m: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div">
            Key Details
          </Typography>
          {/* Display selected key details */}
          <Typography variant="body2">
            Details for {selectedKey}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default KeyDetailsComponent;
