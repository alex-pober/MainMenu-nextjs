import React from "react";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import Link from "next/link";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { forwardRef } from "react";
import { useRouter } from "next/router";

const LinkTab = forwardRef(({ href, ...rest }, ref) => (
  <Link href={href} passHref ref={ref}>
    <Tab {...rest}  />
  </Link>
));

export default function TabSwitcher() {
  const router = useRouter();
  const [tab, setTab] = useState(router.route);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        centered
        color="default"
        sx={{ backgroundColor: "#f5f5f5" }}
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue);
        }}
      >
        <LinkTab
          href="/account/menu-manager"
          label="Manage Menus"
          value={"/account/menu-manager"}
        ></LinkTab>
        <LinkTab
          href="/account/account-info"
          label="Account Info"
          value={"/account/account-info"}
        ></LinkTab>
      </Tabs>
    </Box>
  );
}
