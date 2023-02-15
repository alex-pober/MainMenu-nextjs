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
import EditMenu from "./EditMenu";

export default function ManageMenus({ session, menuData, addMenuData, deleteMenuState }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [menuTitle, setMenuTitle] = useState(undefined);
  const [menuDescription, setMenuDescription] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(false);

  async function createMenu({ menuTitle, menuDescription }) {
    try {
      setLoading(true);

      let { error, status, data } = await supabase
        .from("menu")
        .insert({
          user_id: user.id,
          title: menuTitle,
          description: menuDescription,
        })
        .select();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        addMenuData(data[0]);
      }

      setMenuTitle(undefined);
      setMenuDescription(undefined);
    } catch (error) {
      alert("Error creating menu!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Box
        sx={{ backgroundColor: "#e4e9f2", m: "auto", px: 1, maxWidth: "800px" }}
      >
        <Box sx={{ p: 1, display: "contents" }}>
          {menuData?.map((element) => {
            return (
              <Box sx={{ position: "relative" }}>
                <Link
                  key={element.id}
                  href={{
                    pathname: `account/${element.id}`,
                    query: { title: element.title, desc: element.description },
                  }}
                  style={{ position: "relative", display: "flex" }}
                >
                  <Paper
                    key={element.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      my: 1,
                      width: "100%",
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
                <EditMenu
                  menuId={element.id}
                  deleteMenuState={deleteMenuState}
                />
              </Box>
            );
          })}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={() => setAnchorEl(!anchorEl)}>
              Create Menu
            </Button>
          </Box>

          <Modal
            sx={{ display: "flex" }}
            open={anchorEl}
            onClose={() => setAnchorEl(!anchorEl)}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                my: "auto",
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
