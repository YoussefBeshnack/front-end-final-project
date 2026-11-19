import {
  getFeaturedProducts,
  getProductsByCategory,
  getProductsBySubCategory,
} from '../../services/products.service';
import ProductGrid from './ProductGrid';

interface FeaturedProductsProps {
  page: number;
  brand?: string;
  subcategoryID?: string;
  categoryID?: string;
}

export default async function FeaturedProducts({
  page,
  brand,
  subcategoryID,
  categoryID,
}: FeaturedProductsProps) {
  let featuredProducts;

  if (brand) {
    featuredProducts = await getFeaturedProducts(page, brand);
  } else if (subcategoryID) {
    featuredProducts = await getProductsBySubCategory(subcategoryID);
  } else if (categoryID) {
    featuredProducts = await getProductsByCategory(categoryID);
  } else {
    featuredProducts = await getFeaturedProducts(page);
  }

  return <ProductGrid products={featuredProducts?.data ?? []} />;
}
