import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import ManageMenus from "../../components/ManageMenus";
import Link from "next/link";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavBar from "../../components/NavBar";
import TabSwitcher from "../../components/TabSwitcher";

export default function AccountInfo() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState(userData?.username);
  const [contactEmail, setContactEmail] = useState(userData?.contact_email);
  const [contactNumber, setContactNumber] = useState(userData?.contact_number);
  const [loading, setLoading] = useState(false);

  async function getProfile(userId) {
    try {
      // setLoading(true);
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, contact_email, contact_number`)
        .eq("id", userId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setContactEmail(data.contact_email);
        setContactNumber(data.contact_number);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }

  async function updateProfile({ username, contactEmail, contactNumber }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        contact_email: contactEmail,
        contact_number: contactNumber,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function loadData() {
      getProfile(user?.id);
    }

    if (user) loadData();
  }, [user]);

  return (
    <>
      <NavBar />
      <TabSwitcher />
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={contactEmail || ""}
          disabled
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contactEmail">Contact Email</label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail || ""}
          onChange={(e) => setContactEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          id="contactNumber"
          type="number"
          value={contactNumber || ""}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({ username, contactEmail, contactNumber })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
    </>
  );
}
