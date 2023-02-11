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
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { Link as Muilink } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Dashboard } from "@mui/icons-material";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
export default function NavBar() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [drawer, setDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  const drawerContents = () => (
    <>
      {session ? (
        <Box
          sx={{
            width: "auto",
          }}
          role="presentation"
          onClick={() => setDrawer(!drawer)}
        >
          <List>
            <Link href="/account">
              <ListItem key="Dashboard" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/">
            <ListItem key="View Live Menu" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="View Live Menu" />
              </ListItemButton>
            </ListItem>
            </Link>
            <Divider />
            <ListItem key="Sign Out" disablePadding>
              <ListItemButton
                onClick={() => {
                  signOut();
                }}
              >
                <ListItemIcon>
                  <LogoutTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      ) : (
        <Box
          sx={{
            width: "auto",
          }}
          role="presentation"
          onClick={() => setDrawer(!drawer)}
        >
          <List>
            <ListItem key="Sign Up" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddBoxTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
    </>
  );

  return (
    <AppBar position="static" elevation={1} color="default">
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Image
          alt="logo"
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
            {session ? (
              <>
                <Box>
                  <Link href="/account">
                    <Button
                      sx={{ mr: 1 }}
                      variant="text"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/account">
                    <Button
                      variant="text"
                    >
                      Live Menu
                    </Button>
                  </Link>
                  <Button
                    variant="text"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </Button>
                </Box>
              </>
            ) : (
              <Box>
                <Link href="/account">
                  <Button variant="text">Sign Up</Button>
                </Link>
                <Link href="/account">
                  <Button variant="text">Login</Button>
                </Link>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
