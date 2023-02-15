import React from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditMenu({ actionHandler }) {


  return (
    <Box sx={{ position: "absolute", right: "0", top: "35%", marginInline: 1 }}>
      <IconButton
        variant="outlined"
        color="default"
        size="small"
        sx={{ width: "min-content", m: "auto" }}
        onClick={() => {
          actionHandler('edit')
        }}
      >
        <EditIcon fontSize="small"/>
      </IconButton>
      <IconButton
        variant="outlined"
        color="default"
        onClick={() => {
          actionHandler('delete')
        }}
        size="small"
        sx={{ width: "min-content", m: "auto" }}
      >
        <DeleteIcon fontSize="small"/>
      </IconButton>
    </Box>
  );
}
