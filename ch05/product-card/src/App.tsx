import "./App.css";
import { ProductCard } from "./ProductCard";

export default function App() {
  return (
    <main>
      <ProductCard
        productName="Venus"
        price={300000}
        isOnSale={false}
      />
      <ProductCard
        productName="Mars"
        price={250000}
        isOnSale
        salePrice={200000}
        saleExpiry="2023-10-31"
      />
      {/* This will cause a type error:
      <ProductCard
        productName="Neptune"
        price={500000}
        isOnSale={false}
        salePrice={0} <--- sale price is only valid if item is on sale
      />
      */}
    </main>
  );
}
