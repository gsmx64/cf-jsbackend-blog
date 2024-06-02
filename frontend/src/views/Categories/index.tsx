import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Categories from "../../components/Categories";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCategories from "../../hooks/useCategories";
import useCategoriesStore from "../../state/stores/categories";
import useCurrentUserStore from "../../state/stores/currentUser";


const CategoriesViewDefault = () => {
  return useCategories();
}

const CategoriesViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

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
    fetchCurrentUser();
    fetchCategories(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { categories, currentPage, totalPages, totalItems, itemsPerPage, loading, errorMessage, currentUser, setCurrentPage }
}

const CategoriesView = ({searchTerm}: any) => {
  const { categories, currentPage, totalPages, totalItems, itemsPerPage, loading,
    errorMessage, currentUser, setCurrentPage } = (isZustandEnabled) ? CategoriesViewZustand() : CategoriesViewDefault();

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
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm.toLowerCase()}
          userRole={
            (currentUser?.role != null) && 
            (currentUser.role)}
        />
      </div>
    </>
  );
};

export default CategoriesView;