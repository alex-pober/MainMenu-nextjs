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
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavBar from "../../components/NavBar";
import AccountInfo from "../../components/AccountInfo";

export default function Login() {
  const user = useUser()
  const session = useSession();
  const supabase = useSupabaseClient();
  const [tab, setTab] = useState("1");
  const [userData, setUserData] = useState(undefined);
  const [menuData, setMenuData] = useState(undefined);
  console.log(user)
  async function getProfile(userId) {
    try {
      // setLoading(true);

      let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, contact_email, contact_number`)
      .eq("id", userId)
      .single()

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserData(data);

      }
    } catch (error) {
      console.log(error)
    } finally {
      // setLoading(false);
      getMenus();
    }
  }

  async function getMenus() {
    try {
      // setLoading(true);

      let { data, error, status } = await supabase
      .from("menu")
      .select(`id, title, description`)
      .eq("user_id", user?.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setMenuData(data);
      }
    } catch (error) {
      // alert("Error loading menus");
    } finally {
      // setLoading(false);
    }
  }

  async function deleteMenu(menuId) {
    try {
      let { error } = await supabase.from("menu").delete().eq("id", menuId);

      if (error) {
        throw error;
      }

      setMenuData(menuData.filter((menu) => menu.id !== menuId));
    } catch (error) {
    } finally {
    }
  }

  async function updateMenu(data) {
    try {
      //set loading
      let { data, error } = await supabase
      .from("menu")
      .update({
        title: menuTitle,
        description: menuDescription,
      })
      .eq("id", menu.id)
      .select();

      if (error) {
        throw error;
      }

      if (data) {
        setMenuData(
          menuData.map((menu) => {
            if (menu.id === data[0].id) {
              return data[0];
            } else {
              return item;
            }
          })
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        //finish loading
      }
    }

  function addMenuData(menuPayload) {
    setMenuData([...menuData, menuPayload]);
  }


    useEffect(() => {
      getProfile(user?.id);
    }, [user]);

    return (
      <>
      <NavBar />
      {!session ? (
        <Auth
        supabaseClient={supabase}
        redirectTo="http://localhost:3000/account"
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
                color="default"
                sx={{ backgroundColor: "#f5f5f5" }}
                onChange={(event, newValue) => {
                  setTab(newValue);
                }}
              >
                <Tab label="Manage Menus" value="1" />
                <Tab label="Account Info" value="2" />
              </TabList>
            </Box>
            <TabPanel sx={{ p: 1 }} value="1">
              <ManageMenus
                session={session}
                menuData={menuData}
                addMenuData={addMenuData}
                deleteMenuState={deleteMenu}
              />
            </TabPanel>
            <TabPanel value="2">
              <AccountInfo session={session} userData={userData} />
            </TabPanel>
          </TabContext>
        </Box>
      )}
    </>
  );
}
