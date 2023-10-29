import "./ProductCard.css";

interface BaseProps {
  productName: string;
  price: number;
}

interface ProductCardSaleProps {
  isOnSale: true;
  salePrice: number;
  saleExpiry: string;
}

interface ProductCardNoSaleProps {
  isOnSale: false;
}

type ProductCardProps = BaseProps &
  (ProductCardSaleProps | ProductCardNoSaleProps);

function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function ProductCard(props: ProductCardProps) {
  const { productName, price, isOnSale } = props;

  return (
    <div className={`product-card ${isOnSale ? "on-sale" : ""}`}>
      <h3 className="product-name">{productName}</h3>
      <div className="price">
        <div className="regular-price">{formatPrice(price)}</div>
        {isOnSale && (
          <>
            <div className="sale-price">
              {formatPrice(props.salePrice)}
            </div>
            <div className="sale-expiry">
              Sale ends: {props.saleExpiry}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
