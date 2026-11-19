import { FaBoxOpen } from 'react-icons/fa';
import PageHeader from '../../../components/PageHeader/PageHeader';
import MainTitle from '../../../components/MainTitle/MainTitle';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { getAllCategories } from '../../../services/categories.service';

async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <>
      <PageHeader
        title="All Categories"
        subTitle="Explore our complete categories"
        icon={<FaBoxOpen size={40} />}
      />
      <div className="site-container py-8 flex flex-col gap-6 justify-start items-start">
        <div className="w-full">
          <MainTitle textOne="All" textTwo="Categories" />
        </div>
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories?.map(category => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
