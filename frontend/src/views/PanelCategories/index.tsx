import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelCategories from "../../components/PanelCategories";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCategories from "../../hooks/useCategories";
import useCategoriesStore from "../../state/stores/categories";


const PanelCategoriesViewDefault = () => {
  return useCategories();
}

const PanelCategoriesViewZustand = () => {
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
    fetchCategories(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { categories, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, setCurrentPage,
    handleUpdateStatusCategory, handleDeleteCategory }
}

const PanelCategoriesView = ({ currentUser, settings, searchTerm }: any) => {
  const { categories, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, setCurrentPage,
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
          loading={loading}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          onUpdateStatusCategory={handleUpdateStatusCategory}
          onDeleteCategory={handleDeleteCategory}
          currentUser={currentUser}
          settings={settings}
          searchTerm={searchTerm}
        />
      </div>
    </>
  );
};

export default PanelCategoriesView;