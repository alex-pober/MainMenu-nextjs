import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import _ from "lodash";
import AddMenuItem from "../../components/AddMenuItem";
import EditItem from "../../components/EditItem";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import IconButton from "@mui/material/IconButton";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import NavBar from "../../components/NavBar";
export default function Menu() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const menuId = router.query.menu_id;
  const [items, setItems] = useState(undefined);
  const [editingItems, setEditingItems] = useState([]);

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
    <>
    <NavBar />
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
        mt: 1
      }}
    >
      <Typography variant="h5" align="center" sx={{ pt: 1 }}>
        {router.query.title}
      </Typography>
      <Typography variant="subtitle1" align="center" color="#807D7A">
        {router.query.desc}
      </Typography>
      <Divider variant="middle" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          minWidth: "360px",
          maxWidth: "750px",
          justifyContent: "space-around",
          marginInline: "4%",
        }}
      >
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
                maxWidth: "800px",
              }}
            >
              <Typography variant="h6" align="center">
                {category}
              </Typography>
              {itemsGrouped.map((item, index) => {
                return (
                  <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    minWidth: "360px",
                    maxWidth: "800px",
                    borderBottom: "1px solid #d3d3d3",
                  }}
                  >
                      {editingItems.includes(item.id) ? (
                        <EditItem
                        item={item}
                        supabase={supabase}
                        updateItemState={(payload) => {
                          setEditingItems(
                            _.xor([...editingItems], [payload[0].id])
                            );
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
                          deleteItemState={(id) => {
                            setItems(items.filter((item) => item.id !== id));
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
                            width: "-webkit-fill-available",
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

                      {editingItems.includes(item.id) ? (
                        <IconButton
                          sx={{
                            height: "auto",
                            display: "flex",
                            alignItems: "center",
                            margin: "auto",
                            p: 1
                          }}
                          size="small"
                          //adds item.id if its not in array and removes it if its in there already
                          onClick={() => {
                            setEditingItems(_.xor([...editingItems], [item.id]));
                          }}
                        >
                          <CancelTwoToneIcon fontSize="inherit" />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            margin: "auto",
                          }}
                          size="small"
                          //adds item.id if its not in array and removes it if its in there already
                          onClick={() => {
                            setEditingItems(_.xor([...editingItems], [item.id]));
                          }}
                        >
                          <EditTwoToneIcon fontSize="inherit" />
                        </IconButton>
                      )}
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
    </>
  );
}
