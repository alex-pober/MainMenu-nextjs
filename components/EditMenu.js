import React from 'react'
import Box from "@mui/material/Box";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";

export default function EditMenu({menu, supabse}) {
  console.log(menu)
  async function deleteMenu(){
    try {

      let { error } = await supabse
        .from('menu')
        .delete()
        .eq("id", menu.id)

    } catch (error) {
      console.log(error)
    }finally{

    }
  }
  return (
    <Box sx={{position: 'absolute', right: '0', top: '35%'}}>
       <IconButton
          variant="outlined"
          color="error"
          size="small"
          sx={{width: 'min-content', m: 'auto'}}
        >
          <DeleteTwoToneIcon />
        </IconButton>
    </Box>  )
}
