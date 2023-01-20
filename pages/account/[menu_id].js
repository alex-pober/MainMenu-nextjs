import { getClientBuildManifest } from 'next/dist/client/route-loader'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import _ from 'lodash'

export default function Menu() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const menuId = router.query.menu_id
  const [items, setItems] = useState(null)
  const [category, setCategory] = useState(null)
  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState(null)

  let grouped = _.groupBy(items, item => item.category)

  useEffect(() => {
    if (router.isReady) getItems()
  }, [router.isReady])

  async function getItems(){
    try {
      let { data, error, status } = await supabase
        .from('item')
        .select(`id, category, name, price, description, menu_id`)
        .eq('menu_id', menuId)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setItems(data)
      }

    } catch (error) {
        alert(`${error}`)
    } finally {

    }
  }

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
        setItems([...items, payload])
    } catch (error) {

    } finally {

    }
  }

  return (
    <Paper sx={{minHeight: "95vh", minWidth: '360px', maxWidth: '800px', margin: "auto", mt: "2vh", background: "#fef9f4", borderRadius: "25px", display: 'flex', flexDirection:"column"}}>
      <Typography variant='h4' align='center' sx={{pt: 1}}>{router.query.title}</Typography>
      <Typography variant='subtitle1' align='center' color="#807D7A">{router.query.desc}</Typography>
      <Divider variant="middle" />

      <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        {
          Object.keys(grouped).map(category => {
            let items = (grouped[`${category}`])
            return (
              <Box sx={{display: 'flex', flexWrap: 'warp', width: '85%',flexDirection: "column", m:"auto"}}>
                <Typography variant="h4" align='center'>{category}</Typography>
                <Divider/>
                {items.map(item => {
                  return (
                    <Box sx={{display: 'flex', justifyContent: 'space-between', m: 0.5}}>
                      <Box>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.description}</Typography>
                      </Box>
                      <Typography>{item.price}</Typography>
                    </Box>

                  )
                })}
              </Box>
            )
          })
        }
      </Box>

      <Box sx={{border: '1px solid grey', m: 2, marginTop: 'auto', p: 2}}>
        <Typography variant='h6'>Add Menu Item</Typography>
        <TextField label="Category" variant="outlined" size="small"
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField label="Name" variant="outlined" size="small"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField label="Price" variant="outlined" size="small"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField label="Description" variant="outlined" size="small"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={() => {createItem({category, name, price, description, menuId})}}
        >Submit</Button>
      </Box>
    </Paper>
    );
  }
