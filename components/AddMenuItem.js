import { useState, useEffect } from 'react'
import React from 'react'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function AddMenuItem({items, grouped, menuId, supabase, addItem}) {
  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)
  const [category, setCategory] = useState(null)
  const [description, setDescription] = useState(null)
  console.log(addItem)
  async function createItem({category, name, price, description, menuId}) {
    try {

      let payload = {
        category: category,
        name: name,
        price: price,
        description: description,
        menu_id: menuId
      }

      let {data, error, status} = await supabase
        .from('item')
        .insert(payload)
        .select()

        if (error && status !== 406) {
          throw error
        }
        addItem(payload)
    } catch (error) {

    } finally {

    }
  }

  return (
    <Box sx={{border: '2px solid #807D7A', borderRadius: '15px', m: 2, marginTop: 'auto', p: 2}}>
        <Typography variant='h6'>Add Menu Item</Typography>
        <Divider/>
        <Autocomplete
          value={category}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setCategory(newValue);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setCategory(newValue.inputValue);
            } else {
              setCategory(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = Object.keys(grouped)
            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== '' && !isExisting) {
              filtered.push(inputValue);
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="select-category"
          options={Object.keys(grouped)}
          renderOption={(props, option) => <li {...props}>{option}</li>}
          sx={{ width: 300, m: "auto", marginTop: '8px' }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Category" />
          )}
        />
        <Box sx={{display: 'flex', flexDirection: "row", justifyContent: "space-around"}}>
          <Box sx={{display: 'flex', flexDirection: "column", alignItems: "flex-start"}}>
            <TextField label="Name" variant="outlined" size="small" margin="dense"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField label="Description" variant="outlined" size="small"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box sx={{display: 'flex', flexDirection: "column", alignItems: "flex-end", width: '100px'}}>
            <TextField label="Price" variant="outlined" size="small" margin="dense"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              onClick={() => {createItem({category, name, price, description, menuId})}}
            >Submit</Button>
          </Box>
        </Box>
      </Box>
  )
}

export default AddMenuItem
