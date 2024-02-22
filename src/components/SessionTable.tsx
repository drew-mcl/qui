import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/joy/Table';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import SuiteAppsContext from '../context/SuiteAppsContext';


// Define the type for your app structure
type AppType = {
  id: string;
  name: string;
  version: string;
  group: string;
  phase: number;
  sidecars?: SidecarType[]; // Define SidecarType
};

// Define the type for sidecars
type SidecarType = {
  name: string;
  group: string;
  version: string;
};

const mockVersions = ["1.0", "1.1", "2.0"]; // Simplified mock, replace with fetch logic


export default function SessionTable() {
  const { apps, setApps } = useContext(SuiteAppsContext);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows(expandedRows.includes(id) ? expandedRows.filter(rowId => rowId !== id) : [...expandedRows, id]);
  };

  const handleVersionChange = (
    id: string,
    newVersion: string,
    isSidecar: boolean = false,
    sidecarIndex: number | null = null
  ) => {
    const updatedApps = apps.map(app => {
      if (app.id === id) {
        if (isSidecar && app.sidecars && typeof sidecarIndex === 'number') {
          const updatedSidecars = app.sidecars.map((sidecar, index) =>
            index === sidecarIndex ? { ...sidecar, version: newVersion } : sidecar
          );
          return { ...app, sidecars: updatedSidecars };
        } else {
          return { ...app, version: newVersion };
        }
      }
      return app;
    });
    setApps(updatedApps);
  };

  const handlePhaseChange = (id: string, newPhase: number) => {
    const updatedApps = apps.map(app =>
      app.id === id ? { ...app, phase: newPhase } : app
    );
    setApps(updatedApps);
  };

  const submitSessionData = () => {
    const sessionData = {
      sessionId: "yourSessionId", // This should be dynamically fetched or passed as a prop
      apps: apps.map(app => ({
        name: app.name,
        phase: app.phase,
        version: app.version,
        sidecars: app.sidecars ? app.sidecars : []
      }))
    };

    console.log("Submitting session data:", JSON.stringify(sessionData, null, 2));
    // Here you would use fetch or axios to send sessionData to your backend
  };

      return (
    <div>
      <Table>
      <thead>
        <tr>
          <th>App</th>
          <th>Version</th>
          <th>Actions</th>
        </tr>
      </thead>
        <tbody>
          {apps.map((app) => (
            <React.Fragment key={app.id}>
              <tr>
                <td>
                  {/* Collapsible toggle button */}
                  {app.sidecars && app.sidecars.length > 0 && (
  <IconButton onClick={() => toggleRow(app.id)}>
    {expandedRows.includes(app.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  </IconButton>
)}

                </td>
                <td>{app.name}</td>
                <td>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      value={app.version}
                      onChange={(e) => handleVersionChange(app.id, e.target.value)}
                      label="Version"
                    >
                      {mockVersions.map((version) => (
                        <MenuItem key={version} value={version}>{version}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <Input
                    value={app.phase}
                    type="number"
                    onChange={(e) => handlePhaseChange(app.id, parseInt(e.target.value, 10))}
                    sx={{ width: '70px' }}
                  />
                </td>
                <td>
                  <IconButton onClick={() => /* Implement remove logic */ {}}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
              {expandedRows.includes(app.id) && app.sidecars?.map((sidecar, index) => (
                <tr key={index}>
                  <td></td> {/* Adjust according to your layout */}
                  <td>{sidecar.name}</td>
                  <td>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        value={sidecar.version}
                        onChange={(e) => handleVersionChange(app.id, e.target.value, true, index)}
                        label="Version"
                      >
                        {mockVersions.map((version) => (
                          <MenuItem key={version} value={version}>{version}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <Button variant="contained" onClick={submitSessionData} sx={{ mt: 2 }}>
        Submit Session
      </Button>
    </div>
  );
}