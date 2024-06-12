import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelEditCategoryForm from "../../components/PanelEditCategoryForm";
import CategoriesView from "../Categories";
import { AxiosResponse } from "axios";
import CategoriesService from "../../services/categories.service";
import ICategory, { initICategory } from "../../interfaces/category.interface";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCategoryStore from "../../state/stores/category";


const PanelEditCategoryViewDefault = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<ICategory>(initICategory);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    fetchCategory(categoryId);
  }, []);

  const fetchCategory = (categoryId: string | undefined) => {
    setErrorMessage('');
    setLoading(true);

    return CategoriesService.get(categoryId)
    .then((response: AxiosResponse<any>) => {
      setCategory(response.data);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleEditCategorySaveClick = (id: string, data: any) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return CategoriesService
    .update(id, data)
    .then((response: AxiosResponse) => {
      setLoading(false);        
      if(response.data) {
        setAlertMessage(`Category "${response.data.title}" edited!`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return { categoryId, category, loading, alertMessage, errorMessage,
    handleEditCategorySaveClick
   }
}

const PanelEditCategoryViewZustand = () => {
  const { categoryId } = useParams();
  const category = useCategoryStore((state) => state.category);
  const loading = useCategoryStore((state) => state.loading);
  const alertMessage = useCategoryStore((state) => state.alertMessage);
  const errorMessage = useCategoryStore((state) => state.errorMessage);
  const fetchCategory = useCategoryStore((state) => state.fetchCategory);
  const handleEditCategorySaveClick = useCategoryStore((state) => state.handleEditCategorySaveClick);

  useEffect(() => {
    fetchCategory(categoryId);
  }, []);

  return { categoryId, category, loading, alertMessage, errorMessage,
    handleEditCategorySaveClick
   }
}

const PanelEditCategoryView = ({ currentUser, settings, searchTerm }: any) => {
  const { categoryId, category, loading, alertMessage, errorMessage,
    handleEditCategorySaveClick } = (
    isZustandEnabled) ? PanelEditCategoryViewZustand() : PanelEditCategoryViewDefault();
  const navigate = useNavigate();

  const handleEditCategoryCancelClick = () => {
    navigate(`/list-categories`);
  };

  return (
    <>
      {
      (searchTerm === '') ? (
        <>
          <div className="container">
            <PanelEditCategoryForm
              categoryId={categoryId}
              category={category}
              loading={loading}
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              onEditCategorySaveClick={(id: string | undefined, data: any) => handleEditCategorySaveClick(id as string, data)}
              onEditCategoryCancelClick={handleEditCategoryCancelClick}
              currentUser={currentUser}
              settings={settings}
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

export default PanelEditCategoryView;