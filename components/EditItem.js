import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function EditItem({item}) {
  const [category, setCategory] = useState(null)
  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  const [price, setPrice] = useState(item.price)
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', m: 0.5, alignItems: 'center'}}>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <TextField
          value={name}
          variant="filled"
          size="small"
        />
        <TextField
          value={description}
          variant="filled"
          size="small"
        />
      </Box>
      <TextField
        value={price}
        variant="filled"
        size="small"
      />
  </Box>
  )
}
