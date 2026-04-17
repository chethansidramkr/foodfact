import FoodCard from "./FoodCard";

export default function FoodList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <FoodCard key={product.code} product={product} />
      ))}
    </div>
  );
}
