import React from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditMenu({ menu, supabase }) {
  async function deleteMenu(menu) {
    console.log(menu)
    try {
      let { error } = await supabase.from("menu").delete().eq("id", menu.id);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  return (
    <Box sx={{ position: "absolute", right: "0", top: "35%" }}>
      <IconButton
        variant="outlined"
        color="default"
        size="small"
        sx={{ width: "min-content", m: "auto" }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        variant="outlined"
        color="default"
        onClick={() => {
          deleteMenu(menu)
        }}
        size="small"
        sx={{ width: "min-content", m: "auto" }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
