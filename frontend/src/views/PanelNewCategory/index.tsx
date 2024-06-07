import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CategoriesView from "../Categories";
import PanelNewCategoryForm from "../../components/PanelNewCategoryForm";
import { initICategoryCreate } from "../../interfaces/category.interface";
import useCategory from "../../hooks/useCategory";


const PanelNewCategoryView = ({searchTerm}: any) => {
  const { currentUser, loading, alertMessage, errorMessage,
    handleNewCategorySaveClick } = useCategory();
  const navigate = useNavigate();

  const handleNewCategoryCancelClick = () => {
    navigate(`/categories`);
  };

  return (
    <>
      {
      (searchTerm === '') ? (
        <>
          <div className="container">
            <PanelNewCategoryForm
              category={initICategoryCreate}
              userRole={
                (currentUser?.role != null) ? 
                (currentUser.role) : null}
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              loading={loading}
              onNewCategorySaveClick={handleNewCategorySaveClick}
              onNewCategoryCancelClick={handleNewCategoryCancelClick}
              isSetup={false}
            />
          </div>
        </>
      ) : (
        <>
          <CategoriesView />
        </>
      )
      }
    </>
  );
};

export default PanelNewCategoryView;