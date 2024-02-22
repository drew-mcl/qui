import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';

type AppType = {
  id: string;
  name: string;
  version?: string;
  rolloutPhase: number;
  sidecars?: SidecarType[];
};

type SidecarType = {
  name: string;
  version: string;
};

const mockVersions = ["1.2", "1.1", "1.0"];

function Row(props: { row: AppType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {/* Only show IconButton if sidecars are not undefined and have length > 0 */}
          {row.sidecars && row.sidecars.length > 0 && (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell>
          <Select value={row.version || mockVersions[0]} size="small" fullWidth>
            {mockVersions.map(version => (
              <MenuItem key={version} value={version}>{version}</MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell>
          <Input defaultValue={row.rolloutPhase} type="number" size="small" />
        </TableCell>
        <TableCell align="right"> {/* Placeholder for actions */} </TableCell>
      </TableRow>
      {/* Conditionally render this TableRow only if sidecars exist */}
      {row.sidecars && row.sidecars.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Sidecar Containers
                </Typography>
                <Table size="small" aria-label="pods">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Version</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.sidecars.map((sidecar) => (
                      <TableRow key={sidecar.name}>
                        <TableCell component="th" scope="row">{sidecar.name}</TableCell>
                        <TableCell>
                          <Select value={sidecar.version} size="small" fullWidth>
                            {mockVersions.map(version => (
                              <MenuItem key={version} value={version}>{version}</MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

const rows: AppType[] = [
  { id: '1', name: 'App 1', version: '1.2', rolloutPhase: 2, sidecars: [{ name: 'Sidecar 1A', version: '1.1' }] },
  { id: '2', name: 'App 2', version: '1.1', rolloutPhase: 1 },
  { id: '3', name: 'App 3', version: '1.0', rolloutPhase: 3, sidecars: [{ name: 'Sidecar 3A', version: '1.0' }, { name: 'Sidecar 3B', version: '1.2' }] },
  { id: '4', name: 'App 4', rolloutPhase: 1 },
  // Add more apps as needed
].sort((a, b) => a.rolloutPhase - b.rolloutPhase);

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>App Name</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Rollout Phase</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
