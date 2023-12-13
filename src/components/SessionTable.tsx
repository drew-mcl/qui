import * as React from 'react';
import Table from '@mui/joy/Table';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SuiteAppsContext from '../context/SuiteAppsContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


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

export default function SessionTable() {
  const { apps, setApps } = React.useContext(SuiteAppsContext);
  const handleVersionChange = (id: string, newVersion: string) => {
    // Update the version of the specified app
    const updatedApps = apps.map((app) =>
      app.id === id ? { ...app, version: newVersion } : app
    );
    setApps(updatedApps);
  };

  const handleSidecarVersionChange = (
    appId: string,
    sidecarIndex: number,
    newVersion: string
  ) => {
    // Update the version of the specified sidecar for the app
    const updatedApps = apps.map((app) => {
      if (app.id === appId && app.sidecars) {
        const updatedSidecars = app.sidecars.map((sidecar, index) =>
          index === sidecarIndex
            ? { ...sidecar, version: newVersion }
            : sidecar
        );
        return { ...app, sidecars: updatedSidecars };
      }
      return app;
    });
    setApps(updatedApps);
  };

  const handleRemoveApp = (id: string) => {
    // Remove the specified app
    const filteredApps = apps.filter((app) => app.id !== id);
    setApps(filteredApps);
  };

  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);

  const toggleRow = (id: string) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  return (
    <Table>
      <tbody>
        {apps.map((app: AppType) => (
          <React.Fragment key={app.id}>


            
            <tr>
            <td>{app.sidecars && app.sidecars.length > 0 && (
                   <IconButton
                    aria-label="expand row"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    onClick={() => toggleRow(app.id)}
                    >
                    {expandedRows.includes(app.id) ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
                    </IconButton>
                )}
                </td>
              <td>{app.name}</td>
              <td>{app.phase}</td>
              <td>
                <Input
                  value={app.version}
                  onChange={(e) => handleVersionChange(app.id, e.target.value)}
                />
              </td>
              <td>
                <IconButton onClick={() => handleRemoveApp(app.id)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
            {/* Collapsible row for sidecars */}
            {expandedRows.includes(app.id) && app.sidecars && app.sidecars.length > 0 && (
              <tr>
                <td colSpan={4}>
                  <table>
                    <tbody>
                      {app.sidecars.map((sidecar: SidecarType, index: number) => (
                        <tr key={sidecar.name}>
                          <td>{sidecar.name}</td>
                          <td>{sidecar.group}</td>
                          <td>
                            <Input
                              value={sidecar.version}
                              onChange={(e) =>
                                handleSidecarVersionChange(
                                  app.id,
                                  index,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}
