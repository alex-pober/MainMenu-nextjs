import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone";
import { Button } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import {Link as Muilink} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dashboard } from "@mui/icons-material";

export default function NavBar() {
  const session = useSession();
  const [drawer, setDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  console.log(theme.palette);

  const drawerContents = () => (
    <Box
      sx={{
        width: 'auto',
        backgroundColor: 'theme.palette.background.paper'
      }}
      role="presentation"
      onClick={() => setDrawer(!drawer)}
    >
      <List>
        <ListItem key='Dashboard' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BallotTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
        </ListItem>
        <ListItem key='View Live Menu' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MenuBookTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary='View Live Menu' />
            </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key='Sign Out' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary='Sign Out' />
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <AppBar position="static" elevation={1} color="transparent">
      <Toolbar variant="regular" sx={{ justifyContent: "space-between" }}>
        <Image
          width={100}
          height={100}
          src="https://cpnjwzukiwcoiurbkavl.supabase.co/storage/v1/object/public/assets/main-menu-logo.png"
        />
          {isMobile ? (
            <>
              <Drawer
                anchor="top"
                open={drawer}
                onClose={() => setDrawer(!drawer)}
              >
              {drawerContents()}
              </Drawer>
              <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setDrawer(!drawer)}
              edge="start"
              // sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Box sx={{display: 'flex'}}>
                <MenuItem>
                  <BallotTwoToneIcon />
                    Dashboard
                </MenuItem>
                <MenuItem>
                  <MenuBookTwoToneIcon />
                  View Live Menu
                </MenuItem>
              </Box>
              <Box sx={{display: 'flex'}}>
                <MenuItem>
                  <LogoutTwoToneIcon />
                  Sign Out
                </MenuItem>
              </Box>
            </>
          )}
      </Toolbar>
    </AppBar>
  );
}
