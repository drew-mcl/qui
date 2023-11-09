import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import TreeViewComponent from './TreeViewComponent';
import KeyDetailsComponent from './KeyDetailsComponent';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


export default function EtcdViewer() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleNodeSelect = (nodeId: string) => {
    // Replace this with the actual logic to fetch the selected key's details
    setSelectedKey(`Details for ${nodeId}`);
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



      <Box>
        <TreeViewComponent/>
        {selectedKey && <KeyDetailsComponent selectedKey={selectedKey} />}
      </Box>
    </React.Fragment>
  );
}
