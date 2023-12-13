import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SubmitSessionDialog from './SubmitSessionDialog';
import Button from '@mui/joy/Button';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CodeEditor from './MoncoEditorComponent';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
// icons
export default function ConfigAdjuster () {
    const [code, setCode] = React.useState(`
    [
        { "id": "app1", "name": "Code Editor", "version": "1.4" },
        { "id": "app2", "name": "Terminal", "version": "2.0" },
        { "id": "app3", "name": "Git", "version": "1.0" },
        { "id": "app4", "name": "Photoshop", "version": "1.0" },
        { "id": "app5", "name": "Illustrator", "version": "1.0" },
        { "id": "app6", "name": "InDesign", "version": "1.0" },
        { "id": "app7", "name": "Word", "version": "1.0" },
        { "id": "app8", "name": "Excel", "version": "1.0" },
        { "id": "app9", "name": "PowerPoint", "version": "1.0"}
    ]
`);

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
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
                <Typography color="primary" fontWeight={500} fontSize={12}>
                  Launcher
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
              <Typography level="h2">Dynamic Config Adjustment</Typography>
             
              <Button
                color="primary"
                startDecorator={<FileUploadIcon />}
                size="sm"
              >
                Submit Config
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
  <Button
      color="primary"
      startDecorator={<FileDownloadIcon />}
      size="sm"
      sx={{ flexShrink: 0 }} // Prevent the button from shrinking
    >
      Retrieve Config
    </Button>
  <FormControl sx={{ flexGrow: 1 }} size="sm"> {/* Take up remaining space */}
    <Select size="sm" placeholder="filename">
      <Option value="placeholder">filename</Option>
    </Select>
  </FormControl>

</Box>
<Divider />


            <Box sx={{
  height: 'calc(100vh - 120px)', // Adjust 120px based on your header/footer size
  overflow: 'hidden', // Add this to contain the Monaco editor within the div
}}>
          <CodeEditor code={code} onChange={handleEditorChange} />
        </Box>
  </React.Fragment>
  );
}

