import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";

export default function EditItem({ item, supabase, deleteItemState }) {
  const [category, setCategory] = useState(item?.category);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);

  async function updateItem(item, name, description, price) {
    try {
      let payload = {
        category: category,
        name: name,
        price: price,
        description: description,
      };

      let { data, error } = await supabase
        .from("item")
        .update(payload)
        .eq("id", item.id)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        updateItemState(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async function deleteItem(item){
    try {
      let { error } = await supabase
        .from("item")
        .delete()
        .eq("id", item.id)
    } catch (error) {
      console.log(error)
    } finally {
      deleteItemState(item.id)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        m: 0.5,
        alignItems: "center",
        width: "-webkit-fill-available",
        gap: '16px'
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          value={name || ""}
          variant="outlined"
          size="small"
          onChange={(e) => setName(e.target.value)}
          label="Name"
          margin="dense"
        />
        <TextField
          value={description || ""}
          variant="outlined"
          size="small"
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          margin="dense"
        />
      </Box>
      <TextField
        value={price || ""}
        variant="outlined"
        size="small"
        onChange={(e) => setPrice(e.target.value)}
        label="Price"
        margin="dense"
        width="100px"
      />
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Button
          onClick={() => {
            updateItem(item, name, description, price);
          }}
          variant="contained"
          size="small"
        >
          Update
        </Button>
        <IconButton
          onClick={() => {
            deleteItem(item);
          }}
          variant="outlined"
          color="error"
          size="small"
          sx={{width: 'min-content', m: 'auto'}}
        >
          <DeleteTwoToneIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
