import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import Account from "../../components/ManageMenus";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavBar from "../../components/NavBar";
export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [tab, setTab] = useState("1");
  return (
    <>
      <NavBar />
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
        />
      ) : (
        <Box>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                centered
                onChange={(event, newValue) => {
                  console.log(newValue), setTab(newValue);
                }}
              >
                <Tab label="Manage Menus" value="1" />
                <Tab label="Account Info" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Account session={session} />
            </TabPanel>
            <TabPanel value="2">Accunt info goes here</TabPanel>
          </TabContext>
        </Box>
      )}
    </>
  );
}
