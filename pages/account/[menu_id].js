import { getClientBuildManifest } from "next/dist/client/route-loader";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import _ from "lodash";
import AddMenuItem from "../../components/AddMenuItem";
import EditItem from "../../components/EditItem";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import IconButton from "@mui/material/IconButton";

export default function Menu() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const menuId = router.query.menu_id;
  const [items, setItems] = useState(undefined);
  const [editingItems, setEditingItems] = useState([]);
  console.log(editingItems);
  useEffect(() => {
    if (router.isReady) getItems();
  }, [router.isReady]);
  let grouped = _.groupBy(items, (item) => item.category);

  async function getItems() {
    try {
      let { data, error, status } = await supabase
        .from("item")
        .select(`id, category, name, price, description, menu_id`)
        .eq("menu_id", menuId);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setItems(data);
      }
    } catch (error) {
      alert(`${error}`);
    } finally {
    }
  }

  return (
    <Paper
      sx={{
        minHeight: "95vh",
        minWidth: "360px",
        maxWidth: "800px",
        margin: "auto",
        background: "#fef9f4",
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" align="center" sx={{ pt: 1 }}>
        {router.query.title}
      </Typography>
      <Typography variant="subtitle1" align="center" color="#807D7A">
        {router.query.desc}
      </Typography>
      <Divider variant="middle" />

      <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", minWidth: "360px", maxWidth: "750px", justifyContent: "space-around", marginInline: '5%'}}>
        {Object.keys(grouped).map((category) => {
          let itemsGrouped = grouped[`${category}`];
          return (
            <Box
              key={category}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                minWidth: "360px",
                maxWidth: '800px',
              }}
            >
              <Typography variant="h6" align="center">
                {category}
              </Typography>
              {itemsGrouped.map((item, index) => {
                return (
                  <Box key={index} sx={{display: 'flex', justifyContent: 'space-between', minWidth: "360px", maxWidth: "800px", borderBottom: '1px solid #d3d3d3'}}>
                    {editingItems.includes(item.id) ? (
                      <EditItem
                        item={item}
                        supabase={supabase}
                        updateItemState={(payload) => {
                          setItems(
                            items.map((item) => {
                              if (item.id === payload[0].id) {
                                return payload[0];
                              } else {
                                return item;
                              }
                            })
                          );
                        }}
                      />
                    ) : (
                      <Box
                        id="item-description-price"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          m: 0.5,
                          alignItems: "center",
                          width: "-webkit-fill-available"
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                          <Typography variant="body1" color="grey">
                            {item.description}
                          </Typography>
                        </Box>
                        <Typography variant="button">{item.price}</Typography>
                      </Box>
                    )}
                    <Box sx={{display: 'flex', alignItems: "center"}}>
                      <IconButton
                        sx={{height: 'fit-content'}}
                        size="small"
                        //adds item.id if its not in array and removes it if its in there already
                        onClick={() => {
                          setEditingItems(_.xor([...editingItems], [item.id]));
                        }}
                      >
                        <EditTwoToneIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <AddMenuItem
        grouped={grouped}
        menuId={menuId}
        supabase={supabase}
        addItem={(payload) => setItems([...items, payload])}
      />
    </Paper>
  );
}
