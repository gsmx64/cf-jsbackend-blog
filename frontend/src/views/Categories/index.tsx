import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Categories from "../../components/Categories";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCategories from "../../hooks/useCategories";
import useCategoriesStore from "../../state/stores/categories";


const CategoriesViewDefault = () => {
  return useCategories();
}

const CategoriesViewZustand = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const currentPage = useCategoriesStore((state) => state.currentPage);
  const totalPages = useCategoriesStore((state) => state.totalPages);
  const totalItems = useCategoriesStore((state) => state.totalItems);
  const itemsPerPage = useCategoriesStore((state) => state.itemsPerPage);
  const loading = useCategoriesStore((state) => state.loading);
  const errorMessage = useCategoriesStore((state) => state.errorMessage);
  const setCurrentPage = useCategoriesStore((state) => state.setCurrentPage);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchCategories(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { categories, currentPage, totalPages, totalItems, itemsPerPage, loading, errorMessage, setCurrentPage }
}

const CategoriesView = ({ currentUser, settings, searchTerm }: any) => {
  const { categories, currentPage, totalPages, totalItems, itemsPerPage, loading,
    errorMessage, setCurrentPage } = (isZustandEnabled) ? CategoriesViewZustand() : CategoriesViewDefault();

  return (
    <>
      <div className="container">
        <Categories
          data={categories}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          loading={loading}
          errorMessage={errorMessage}
          currentUser={currentUser}
          settings={settings}
          searchTerm={searchTerm.toLowerCase()}
        />
      </div>
    </>
  );
};

export default CategoriesView;