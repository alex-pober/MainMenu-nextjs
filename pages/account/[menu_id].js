import { getClientBuildManifest } from 'next/dist/client/route-loader'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function Menu() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const menuId = router.query.menu_id
  const [items, setItems] = useState(null)

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
      console.log(error)
      // alert(`${error}`)
    } finally {

    }
    console.log(items)
  return (
    <Paper>
      <Typography variant='h3'>YO</Typography>
    </Paper>
    );
  }
}
