import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/savedSlice";
import { Button, Typography, Paper } from "@mui/material";
import NutritionRow from "../components/NutritionRow";

export default function DetailPage() {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.saved.items);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const res = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );

      if (!cancelled) {
        setProduct(res.data.product);
      }
    };

    fetchData();

    return () => (cancelled = true);
  }, [barcode]);

  if (!product) return <p>Loading...</p>;

  const isSaved = saved.some((p) => p.code === barcode);

  return (
    <Paper sx={{ padding: 2 }}>
      <Button onClick={() => navigate(-1)}>Back</Button>

      <Typography variant="h5">{product.product_name}</Typography>

      <NutritionRow label="Calories" value={product.nutriments?.["energy-kcal_100g"]} />
      <NutritionRow label="Protein" value={product.nutriments?.proteins_100g} />
      <NutritionRow label="Carbs" value={product.nutriments?.carbohydrates_100g} />
      <NutritionRow label="Fat" value={product.nutriments?.fat_100g} />

      <Button
        variant="contained"
        onClick={() =>
          dispatch(
            isSaved
              ? removeItem(barcode)
              : addItem(product)
          )
        }
      >
        {isSaved ? "Remove" : "Save"}
      </Button>
    </Paper>
  );
}
