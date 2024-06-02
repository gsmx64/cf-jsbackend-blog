import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelCategories from "../../components/PanelCategories";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCategories from "../../hooks/useCategories";
import useCategoriesStore from "../../state/stores/categories";
import useCurrentUserStore from "../../state/stores/currentUser";


const PanelCategoriesViewDefault = () => {
  return useCategories();
}

const PanelCategoriesViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const categories = useCategoriesStore((state) => state.categories);
  const currentPage = useCategoriesStore((state) => state.currentPage);
  const totalPages = useCategoriesStore((state) => state.totalPages);
  const totalItems = useCategoriesStore((state) => state.totalItems);
  const itemsPerPage = useCategoriesStore((state) => state.itemsPerPage);
  const loading = useCategoriesStore((state) => state.loading);
  const alertMessage = useCategoriesStore((state) => state.alertMessage);
  const errorMessage = useCategoriesStore((state) => state.errorMessage);
  const setCurrentPage = useCategoriesStore((state) => state.setCurrentPage);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const handleUpdateStatusCategory = useCategoriesStore((state) => state.handleUpdateStatusCategory);
  const handleDeleteCategory = useCategoriesStore((state) => state.handleDeleteCategory);

  useEffect(() => {
    fetchCurrentUser();
    fetchCategories(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { categories, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage,
    handleUpdateStatusCategory, handleDeleteCategory }
}

const PanelCategoriesView = ({searchTerm}: any) => {
  const { categories, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, currentUser, setCurrentPage,
    handleUpdateStatusCategory, handleDeleteCategory
  } = (isZustandEnabled) ? PanelCategoriesViewZustand() : PanelCategoriesViewDefault();

  return (
    <>
      <div className="container">
        <PanelCategories
          data={categories}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm}
          onUpdateStatusCategory={handleUpdateStatusCategory}
          onDeleteCategory={handleDeleteCategory}
          userRole={
            (currentUser?.role != null) &&
            (currentUser.role)}
        />
      </div>
    </>
  );
};

export default PanelCategoriesView;