import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import TreeViewComponent from './TreeViewComponent';
import KeyDetailsComponent from './KeyDetailsComponent';
import CssBaseline from '@mui/joy/CssBaseline';
import CssVarsProvider from '@mui/joy/styles/CssVarsProvider';

export default function EtcdViewer() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleNodeSelect = (nodeId: string) => {
    // Replace this with the actual logic to fetch the selected key's details
    setSelectedKey(`Details for ${nodeId}`);
  };

  return (
    <React.Fragment>
      <Box>
        <TreeViewComponent/>
        {selectedKey && <KeyDetailsComponent selectedKey={selectedKey} />}
      </Box>
    </React.Fragment>
  );
}
