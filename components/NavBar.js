import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
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
export default function NavBar() {
  const session = useSession();
  const [menuToggle, setMenuToggle] = useState(null);
  console.log(session);
  return (
    <AppBar position="static" elevation={1} color="transparent">
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Image
          width={200}
          height={100}
          src="https://cpnjwzukiwcoiurbkavl.supabase.co/storage/v1/object/public/assets/main-menu-logo.png"
        />
        {session && (
          <>
          <div>
            <Link underline="hover" href="/account">Dashboard</Link>
          </div>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => {
                  setMenuToggle(e.currentTarget);
                }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={menuToggle}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(menuToggle)}
                onClose={() => {
                  setMenuToggle(null);
                }}
              >
                <MenuItem>
                  <BallotTwoToneIcon />
                  Dashboard
                </MenuItem>

                <MenuItem>
                  <MenuBookTwoToneIcon />
                  View Live Menu
                </MenuItem>

                <MenuItem>
                  <LogoutTwoToneIcon />
                  Sign Out
                </MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
