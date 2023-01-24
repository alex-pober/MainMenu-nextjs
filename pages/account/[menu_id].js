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
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import _ from 'lodash'
import AddMenuItem from '../../components/AddMenuItem';
const filter = createFilterOptions();

export default function Menu() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const menuId = router.query.menu_id
  const [items, setItems] = useState(null)
  const [category, setCategory] = useState(null)
  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState(null)
  console.log(items)
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

  return (
    <Paper sx={{minHeight: "95vh", minWidth: '360px', maxWidth: '800px', margin: "auto", background: "#fef9f4", borderRadius: "25px", display: 'flex', flexDirection:"column"}}>
      <Typography variant='h5' align='center' sx={{pt: 1}}>{router.query.title}</Typography>
      <Typography variant='subtitle1' align='center' color="#807D7A">{router.query.desc}</Typography>
      <Divider variant="middle" />

      <Box sx={{display: 'flex', flexWrap: 'wrap', width: "100%"}}>
        {
          Object.keys(grouped).map(category => {
            let items = (grouped[`${category}`])
            return (
              <Box sx={{display: 'flex', flexWrap: 'wrap', width: '80%',flexDirection: "column", minWidth: '150px', m:"auto"}}>
                <Typography variant="h6" align='center'>{category}</Typography>
                {items.map(item => {
                  return (
                    <>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', m: 0.5, alignItems: 'center'}}>
                        <Box>
                          <Typography variant="subtitle1">{item.name}</Typography>
                          <Typography variant="body1" color="grey">{item.description}</Typography>
                        </Box>
                        <Typography variant="button">{item.price}</Typography>
                      </Box>
                      <Divider />
                    </>

                  )
                })}
              </Box>
            )
          })
        }
      </Box>

      <AddMenuItem
        items={items}
        grouped={grouped}
        menuId={menuId}
        supabase={supabase}
        addItem={(payload) => setItems([...items, payload])}/>
    </Paper>
    );
  }
