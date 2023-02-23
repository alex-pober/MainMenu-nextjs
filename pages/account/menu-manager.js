import React from 'react'
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState, useEffect } from "react";
import {
  useUser,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import ManageMenus from "../../components/ManageMenus";
import Link from "next/link";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import NavBar from "../../components/NavBar";
import Tabs from "@mui/material/Tabs";
import {forwardRef} from "react";
import TabSwitcher from '../../components/TabSwitcher';

const LinkTab = forwardRef(({href, ...rest}, ref) => (
  <Link href={href} passHref ref={ref}>
    <Tab component="div" {...rest}/>
  </Link>
))

export default function MenuManager() {
  const [tab, setTab] = useState(1);
  const session = useSession();
  return (
  <>
  <NavBar />
  <TabSwitcher />
<ManageMenus
            session={session}
            // menuData={menuData}
            // addMenuData={addMenuData}
            // deleteMenuState={deleteMenu}
          />
  </>
  )
}
