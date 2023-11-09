import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import TreeViewComponent from './TreeViewComponent';
import KeyDetailsComponent from './KeyDetailsComponent';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import axios from 'axios';

// Define the structure of your key detail object
interface KeyDetail {
  nodeId: string,
  name: string;
  value: string;
}



export default function EtcdViewer() {
  const [selectedKey, setSelectedKey] = useState<KeyDetail | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [valueExists, setValueExists] = useState(true);


  const handleNodeSelect = async (nodeId: string) => {
    setIsFetching(true);
    setValueExists(true); // Reset this state in case the previous key had no value
    try {
      const response = await axios.get<KeyDetail>(`/api/value${nodeId}`);
      // Create a new object that includes the nodeId and the rest of the data.
      const keyWithNodeId = {
        ...response.data,
        nodeId: nodeId, // Add the nodeId to the selectedKey object
      };
      setSelectedKey(keyWithNodeId);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // No value exists for the key
        setSelectedKey(null);
        setValueExists(false);
      } else {
        console.error('Error fetching key details:', error);
      }
    } finally {
      setIsFetching(false);
    }
  };
  
  

  return (
    <React.Fragment>

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
                <Link
                  underline="hover"
                  color="neutral"
                  href="#some-link"
                  fontSize={12}
                  fontWeight={500}
                >
                  Dashboard
                </Link>
                <Typography color="primary" fontWeight={500} fontSize={12}>
                  Etcd Inspector
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
            <Typography level="h2">Etcd Inspector</Typography>
        </Box>

        <Box
  sx={{
    display: 'flex',
    flexDirection: 'row', // This ensures the children are in a row
    gap: 2, // Adjust the gap as necessary
    alignItems: 'flex-start', // Aligns items to the start of the container
  }}
>
<Box sx={{ flex: '0 0 auto', minWidth: '30%', overflowY: 'auto' }}> 
    <TreeViewComponent onNodeSelect={handleNodeSelect} />
  </Box>

       {/* Details component should take the remaining space */}
  <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
    {isFetching ? (
      <Box>Loading....</Box>
    ) : valueExists ? (
      selectedKey && <KeyDetailsComponent selectedKey={selectedKey} />
    ) : (
      <Box>No value exists for this key.</Box>
    )}
  </Box>
  </Box>
    </React.Fragment>
  );
}
