import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/savedSlice";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SavedPage() {
  const saved = useSelector((state) => state.saved.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (saved.length === 0) return <p>No saved items</p>;

  return (
    <>
      {saved.map((item) => (
        <Card key={item.code} sx={{ margin: 2 }}>
          <CardContent>
            <Typography>{item.product_name}</Typography>

            <Button onClick={() => navigate(`/product/${item.code}`)}>
              View
            </Button>

            <Button onClick={() => dispatch(removeItem(item.code))}>
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
