import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SuiteAppsContext from '../context/SuiteAppsContext';
import { useContext, useState, useEffect } from 'react';

import suitesData from '../data/suites.json'; // Assuming suites.json is the updated JSON file

type Suite = {
  id: string;
  name: string;
  description: string;
  apps: App[];
};

type App = {
  id: string;
  name: string;
  version: string;
  group: string;
  phase: number;
};

export default function CollapsibleSuiteList() {
  const { setApps } = useContext(SuiteAppsContext);
  const [openSuiteIds, setOpenSuiteIds] = useState<Record<string, boolean>>({});
  const [suites, setSuites] = useState<Suite[]>([]); // Initialize suites as empty array

  useEffect(() => {
    fetch('http://localhost:8080/api/suites') // Modify URL as needed
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setSuites(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []); // Empty dependency array to run only once


  const handleSuiteNameClick = (suiteId: string) => {
    const suite = suites.find(s => s.id === suiteId);
    if (!suite) return;

    setApps(suite.apps); // Directly use the apps array from the suite
  };

  const handleToggleSuite = (event: React.MouseEvent<HTMLElement>, suiteId: string) => {
    event.stopPropagation();
    setOpenSuiteIds(prevOpenSuiteIds => ({
      ...prevOpenSuiteIds,
      [suiteId]: !prevOpenSuiteIds[suiteId],
    }));
  };

  return (
    <Box sx={{ width: 320, pl: '24px' }}>
      <List sx={{ '--List-insetStart': '32px', '--ListItem-paddingY': '0px' }}>
        {suites.map((suite: Suite) => (
          <React.Fragment key={suite.id}>
            <ListItem
              nested
              startAction={
                <IconButton
                  variant="plain"
                  size="sm"
                  color="neutral"
                  onClick={(event) => handleToggleSuite(event, suite.id)}
                >
                  <KeyboardArrowDown
                    sx={{ transform: openSuiteIds[suite.id] ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                  />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => handleSuiteNameClick(suite.id)}>
                {suite.name}
              </ListItemButton>
            </ListItem>
            {openSuiteIds[suite.id] && (
              <List sx={{ '--List-gap': '0px' }}>
                {suite.apps.map((app: App) => (
                  <ListItem key={app.id}>
                    <ListItemButton>{app.name}</ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
