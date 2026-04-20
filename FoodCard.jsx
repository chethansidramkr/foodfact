import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FoodCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/product/${product.code}`)}>
        <CardContent>
          <Typography variant="h6">
            {product.product_name}
          </Typography>
          <Typography variant="body2">{product.brands}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
