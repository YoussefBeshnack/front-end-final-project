import type { ProductCardProps } from '../../types/product.type';
import ProductCard from '../ProductCard/ProductCard';

function ProductGrid({ products }: { products: ProductCardProps[] }) {
  return (
    <div className="flex w-full flex-col gap-6 justify-center items-center">
      <div className="grid w-full grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map(product => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.title}
            category={product.category.name}
            image={product.imageCover}
            price={product.price}
            rating={product.ratingsAverage}
            reviews={product.ratingsQuantity}
            link={`/products/${product._id}`}
            priceAfterDiscount={product.priceAfterDiscount}
            quantity={product.quantity}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
