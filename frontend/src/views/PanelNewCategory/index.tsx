import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CategoriesView from "../Categories";
import PanelNewCategoryForm from "../../components/PanelNewCategoryForm";
import { initICategoryCreate } from "../../interfaces/category.interface";
import useCategory from "../../hooks/useCategory";


const PanelNewCategoryView = ({ currentUser, settings, searchTerm }: any) => {
  const { loading, alertMessage, errorMessage,
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
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              loading={loading}
              onNewCategorySaveClick={handleNewCategorySaveClick}
              onNewCategoryCancelClick={handleNewCategoryCancelClick}
              currentUser={currentUser}
              settings={settings}
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