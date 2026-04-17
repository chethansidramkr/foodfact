import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );

        if (!cancelled) {
          setProduct(res.data.product);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [barcode]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Error loading product</p>;

  const isSaved = saved.some((p) => p.code === barcode);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      <h2>{product.product_name}</h2>

      <p>Brand: {product.brands}</p>

      <p>Calories: {product.nutriments?.["energy-kcal_100g"]}</p>
      <p>Protein: {product.nutriments?.proteins_100g}</p>
      <p>Carbs: {product.nutriments?.carbohydrates_100g}</p>
      <p>Fat: {product.nutriments?.fat_100g}</p>

      <button
        onClick={() =>
          dispatch({
            type: isSaved ? "REMOVE" : "ADD",
            product,
            code: barcode,
          })
        }
      >
        {isSaved ? "Remove" : "Save"}
      </button>
    </div>
  );
}
