import React from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Typography from '@mui/joy/Typography';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Grid from '@mui/joy/Grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';





// Dummy data
interface AppInstance {
    id: string;
    status: string;
    version: string;
  }
  
  interface AppCategory {
    name: string;
    instances: AppInstance[];
  }
  
  const appCategories: AppCategory[] = [
    {
        name: 'App A1',
        instances: [
          { id: 'a1-i1', status: 'Running', version: '1.2.3' },
          { id: 'a1-i2', status: 'Stopped', version: '1.2.4' },
          // Add more instances as needed
        ],
      },
      {
        name: 'App A2',
        instances: [
          { id: 'a2-i1', status: 'Running', version: '2.1.3' },
          { id: 'a2-i2', status: 'Maintenance', version: '2.1.4' },
          // Add more instances as needed
        ],
      },
  ];

export default function AppDataTable() {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<number | null>(null);

    // Get instances of the selected app category or an empty array if none is selected
    const selectedInstances = selectedCategoryIndex !== null ? appCategories[selectedCategoryIndex].instances : [];
  
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
                  Release Radar
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
            <Typography level="h2">Release Radar</Typography>
        </Box>

        <Grid container spacing={2} alignItems="flex-start">
            <Grid xs={12} md={2}>
                <Sheet
                    variant="outlined"
                    sx={{
                        overflow: 'auto',
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                      }}
                >
                    <List>
                        {appCategories.map((category, categoryIndex) => (
                        <ListItem nested key={categoryIndex}>
                            <List>
                            <ListItem sticky key={categoryIndex}>
                                <ListItemButton onClick={() => setSelectedCategoryIndex(categoryIndex)}>
                                    {category.name}
                                </ListItemButton>
                            </ListItem>
                            </List>
                        </ListItem>
                        ))}
                    </List>
                </Sheet>
            </Grid>
            <Grid xs={12} md={10}>
            <FormControl sx={{ flex: 1 }} size="md">
          <Input size="md" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
                <Table size="lg">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Version</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {selectedInstances.map((instance) => (
                        <tr key={instance.id}>
                        <td>{instance.id}</td>
                        <td>{instance.version}</td>
                        <td>{instance.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Grid>
        </Grid>
    </React.Fragment>
  );
}


