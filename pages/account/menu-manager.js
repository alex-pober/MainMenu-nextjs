import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState, useEffect } from "react";
import {
  useUser,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import ManageMenus from "../../components/ManageMenus";
import Box from "@mui/material/Box";
import NavBar from "../../components/NavBar";
import TabSwitcher from "../../components/TabSwitcher";

export default function MenuManager() {
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
  );
}
