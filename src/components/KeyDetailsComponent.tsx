import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface KeyDetailsProps {
  selectedKey: {
    nodeId: string,
    name: string;
    value: string;
  };
}

const KeyDetailsComponent: React.FC<KeyDetailsProps> = ({ selectedKey }) => {
  return (
    <Box sx={{ maxWidth: 360, m: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div">
            Key Details
          </Typography>
          {/* Display selected key name */}
          <Typography variant="body1" color="text.secondary">
            Key: {selectedKey.nodeId}
          </Typography>
          {/* Display selected key value */}
          <Typography variant="body2">
            Value: {selectedKey.value}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default KeyDetailsComponent;

