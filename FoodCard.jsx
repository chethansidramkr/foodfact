export default function FoodCard({ product }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{product.product_name || "No Name"}</h3>

      <p><strong>Brand:</strong> {product.brands || "Unknown"}</p>

      <img
        src={product.image_small_url || "https://via.placeholder.com/100"}
        alt={product.product_name}
        width="100"
      />

      <p>
        Calories: {product.nutriments?.["energy-kcal_100g"] ?? "N/A"}
      </p>
      <p>
        Protein: {product.nutriments?.proteins_100g ?? "N/A"} g
      </p>
      <p>
        Carbs: {product.nutriments?.carbohydrates_100g ?? "N/A"} g
      </p>
      <p>
        Fat: {product.nutriments?.fat_100g ?? "N/A"} g
      </p>
    </div>
  );
}
