import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';



export default function Dashboard() {
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
        <Typography level="h2">Dashboard</Typography>
    </Box>




    <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor">
          mclachlan-04d
        </Typography>
        <Typography level="body-sm">amer qa</Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        color="success"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'xs',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        live
      </CardOverflow>
    </Card>
    <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor">
          mclachlan-84d
        </Typography>
        <Typography level="body-sm">emea qa</Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        color="success"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'xs',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        live
      </CardOverflow>
    </Card>
    <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor">
          mclachlan-43s
        </Typography>
        <Typography level="body-sm">amer dev</Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        color="danger"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'xs',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        stopped
      </CardOverflow>
    </Card>
    <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor">
          mclachlan-12u
        </Typography>
        <Typography level="body-sm">amer dev</Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        color="warning"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'xs',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        stale
      </CardOverflow>
    </Card>
    </React.Fragment>
  );
}