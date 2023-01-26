import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditItem({ item, supabase, updateItemState }) {
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        m: 0.5,
        alignItems: "center",
        width: "-webkit-fill-available"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          value={name || ""}
          variant="filled"
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          value={description || ""}
          variant="filled"
          size="small"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <TextField
        value={price || ""}
        variant="filled"
        size="small"
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button
        onClick={() => {
          updateItem(item, name, description, price);
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
