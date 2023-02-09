import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Popover from "@mui/material/Popover";
import Modal from "@mui/material/Modal";
import NavBar from "./NavBar";
export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState(Number);
  const [menus, setMenus] = useState(undefined);
  const [menuTitle, setMenuTitle] = useState(undefined);
  const [menuDescription, setMenuDescription] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(false);

  useEffect(() => {
    getProfile();
    getMenus();
  }, [session]);

  async function getMenus() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("menu")
        .select(`id, title, description`)
        .eq("user_id", user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setMenus(data);
      }
    } catch (error) {
      alert("Error loading menus");
    } finally {
      setLoading(false);
    }
  }

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, contact_email, contact_number`)
        .eq("id", user.id)
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
      alert("Error loading user data!");
    } finally {
      setLoading(false);
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

  async function createMenu({ menuTitle, menuDescription }) {
    try {
      setLoading(true);

      let { error, status } = await supabase.from("menu").insert({
        user_id: user.id,
        title: menuTitle,
        description: menuDescription,
      });

      if (error && status !== 406) {
        throw error;
      }

      setMenuTitle(undefined);
      setMenuDescription(undefined);
    } catch (error) {
      alert("Error creating menu!");
    } finally {
      getMenus();
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar />
      <Box
        sx={{ backgroundColor: "#e4e9f2", maxWidth: "950px", m: "auto", p: 5 }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
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

        <Box sx={{ p: 1, display: "contents" }}>
          {menus?.map((element) => {
            return (
              <Link
                href={{
                  pathname: `account/${element.id}`,
                  query: { title: element.title, desc: element.description },
                }}
              >
                <Paper
                  key={element.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    my: 1,
                    borderRadius: "10px",
                    "&:hover": {
                      outline: "2px solid #ffcc6b",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography color="#212121" variant="h6">
                    {element.title}
                  </Typography>
                  <Typography color="#212121" variant="body2">
                    {element.description}
                  </Typography>
                </Paper>
              </Link>
            );
          })}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={() => setAnchorEl(!anchorEl)}>
              Create Menu
            </Button>
          </Box>

          <Modal open={anchorEl} onClose={() => setAnchorEl(!anchorEl)}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                my: "50%",
                mx: "auto",
                borderRadius: "10px",
                display: "grid",
                maxWidth: "300px",
              }}
            >
              <TextField
                required
                size="small"
                margin="dense"
                label="Menu Title"
                variant="outlined"
                type="text"
                value={menuTitle || ""}
                onChange={(e) => setMenuTitle(e.target.value)}
                helperText="Ex: Brunch, Dinner, Happy Hour, Drinks"
              />
              <TextField
                margin="dense"
                label="Menu Description"
                multiline
                rows={2}
                variant="outlined"
                value={menuDescription || ""}
                onChange={(e) => setMenuDescription(e.target.value)}
                helperText="optional*"
              />
              <Button
                variant="contained"
                className="button primary block"
                onClick={() => createMenu({ menuTitle, menuDescription })}
                disabled={loading}
              >
                {loading ? "Loading ..." : "Add Menu"}
              </Button>
            </Paper>
          </Modal>
        </Box>
      </Box>
    </>
  );
}
