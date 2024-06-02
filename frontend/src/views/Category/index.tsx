import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Category from "../../components/Category";
import PostsView from "../Posts";
import AuthService from "../../services/auth.service";
import CategoriesService from "../../services/categories.service";
import IUser from "../../interfaces/user.interface";
import ICategory, { initICategory } from "../../interfaces/category.interface";
import useCategoryStore from "../../state/stores/category";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCurrentUserStore from "../../state/stores/currentUser";


const CategoryViewDefault = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const { categoryId } = useParams();
  const [category, setCategory] = useState<ICategory>(initICategory);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    fetchCurrentUser();
    fetchCategory(categoryId);
  }, []);

  const fetchCurrentUser = () => {
    return AuthService.getCurrentUser()
    .then((response: AxiosResponse) => {
      setCurrentUser(response.data);
    });
  }

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

  return { category, loading, errorMessage, currentUser }
}

const CategoryViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const { categoryId } = useParams();
  const category = useCategoryStore((state) => state.category);
  const loading = useCategoryStore((state) => state.loading);
  const errorMessage = useCategoryStore((state) => state.errorMessage);
  const fetchCategory = useCategoryStore((state) => state.fetchCategory);

  useEffect(() => {
    fetchCurrentUser();
    fetchCategory(categoryId);
  }, []);

  return { category, loading, errorMessage, currentUser }
}

const CategoryView = ({searchTerm, setSearchTerm}: any) => {
  const { category, loading, errorMessage, currentUser } = (
    isZustandEnabled) ? CategoryViewZustand() : CategoryViewDefault();

  return (
    <>
      {
      (searchTerm === '') ? (
        <>
          <div className="container">
            <Category
              category={category || initICategory}
              errorMessage={errorMessage}
              loading={loading}
              setSearchTerm={setSearchTerm}
              userRole={
                (currentUser?.role != null) ? 
                (currentUser.role) : null}
            />
          </div>
        </>
      ) : (
        <>
          <PostsView
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </>
      )
      }
    </>
  );
};

export default CategoryView;