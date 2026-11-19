import { FaTags } from 'react-icons/fa';
import PageHeader from '../../../components/PageHeader/PageHeader';
import MainTitle from '../../../components/MainTitle/MainTitle';
import BrandCard from '../../../components/BrandCard/BrandCard';
import { getAllBrands } from '../../../services/brands.service';

async function BrandsPage() {
  const brands = await getAllBrands();
  return (
    <>
      <PageHeader
        title="Top Brands"
        subTitle="Shop from your favorite brands"
        icon={<FaTags size={40} />}
      />
      <div className="site-container py-8 flex flex-col gap-6 justify-start items-start">
        <div className="w-full">
          <MainTitle textOne="All" textTwo="Brands" />
        </div>
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands?.map(brand => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BrandsPage;
