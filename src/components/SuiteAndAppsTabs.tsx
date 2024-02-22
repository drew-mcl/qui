import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface SuiteApp {
  id: string;
  name: string;
}

// Mock data for suites and apps
const mockSuites: SuiteApp[] = [
  { id: 'suite1', name: 'Suite 1' },
  { id: 'suite2', name: 'Suite 2' },
  { id: 'suite3', name: 'Suite 3' },
];

const mockApps: SuiteApp[] = [
  { id: 'app1', name: 'App 1' },
  { id: 'app2', name: 'App 2' },
  { id: 'app3', name: 'App 3' },
];

export default function SuiteAndAppsTabs() {
  const [tabValue, setTabValue] = useState<string>('suites');
  const [suites, setSuites] = useState<SuiteApp[]>([]);
  const [apps, setApps] = useState<SuiteApp[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setSuites(mockSuites);
    setApps(mockApps);
    // Replace above lines with actual API calls to fetch suites and apps
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabValue} onChange={handleChange} aria-label="Suites and Apps Tabs">
        <Tab label="Suites" value="suites" />
        <Tab label="Apps" value="apps" />
      </Tabs>
      {tabValue === 'suites' && (
        <List>
          {suites.map((suite) => (
            <ListItem key={suite.id}>
              <ListItemText primary={suite.name} />
            </ListItem>
          ))}
        </List>
      )}
      {tabValue === 'apps' && (
        <List>
          {apps.map((app) => (
            <ListItem key={app.id}>
              <ListItemText primary={app.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
