import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import suitesData from '../data/suites.json';
import appsData from '../data/apps.json';
import SuiteAppsContext from '../context/SuiteAppsContext';
import { useContext, useEffect, useState } from 'react';


// Assuming the structure of your JSON data, define the types
type Suite = {
  id: string;
  name: string;
  apps: string[];
};
type App = typeof appsData[number];

export default function CollapsibleSuiteList() {
  const { setApps } = useContext(SuiteAppsContext);
  const [openSuiteIds, setOpenSuiteIds] = useState<Record<string, boolean>>({});
  const [suitesData, setSuitesData] = useState<Suite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    fetch('http://localhost:8080/suites')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching suites: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSuitesData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);


   // Handles clicking on the suite name
const handleSuiteNameClick = (suiteId: string) => {
  // Find the suite by id
  const suite = suitesData.find(s => s.id === suiteId);
  if (!suite) return;

  // Find the apps related to this suite
  const suiteApps = suite.apps.map(appId => 
    appsData.find(app => app.id === appId)
  ).filter(app => app !== undefined) as App[];

  // Add these apps to the current list of apps in a non-duplicative manner
  setApps(prevApps => {
    // Create a map of app IDs for the current apps for quick lookup
    const currentAppIds = new Set(prevApps.map(app => app.id));
    
    // Filter the suiteApps to include only those not already in the currentAppIds
    const newApps = suiteApps.filter(app => !currentAppIds.has(app.id));

    // Return the new array of apps, which includes the previous apps plus the new ones
    return [...prevApps, ...newApps];
  });
};


const handleToggleSuite = (event: React.MouseEvent<HTMLElement>, suiteId: string) => {
  event.stopPropagation();
  setOpenSuiteIds(prevOpenSuiteIds => ({
    ...prevOpenSuiteIds,
    [suiteId]: !prevOpenSuiteIds[suiteId],
  }));
};


if (isLoading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}


  return (
    <Box sx={{ width: 320, pl: '24px' }}>
      <List sx={{ '--List-insetStart': '32px', '--ListItem-paddingY': '0px' }}>
        {suitesData.map((suite: Suite) => (
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
              {/* Adjust this element to only trigger on the suite name */}
              <ListItemButton onClick={() => handleSuiteNameClick(suite.id)}>
                {suite.name}
              </ListItemButton>
            </ListItem>
            {openSuiteIds[suite.id] && (
              <List sx={{ '--List-gap': '0px' }}>
                {suite.apps.map((appId: string) => {
                  const app = appsData.find((a: App) => a.id === appId);
                  if (!app) {
                    return null;
                  }
                  return (
                    <ListItem key={appId}>
                      <ListItemButton>{app.name}</ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
