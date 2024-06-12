import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Category from "../../components/Category";
import PostsView from "../Posts";
import useCategory from "../../hooks/useCategory";
import useCategoryStore from "../../state/stores/category";
import { isZustandEnabled } from "../../constants/defaultConstants";


const CategoryViewDefault = () => {
  return useCategory();
}

const CategoryViewZustand = () => {
  const { categoryId } = useParams();
  const category = useCategoryStore((state) => state.category);
  const loading = useCategoryStore((state) => state.loading);
  const errorMessage = useCategoryStore((state) => state.errorMessage);
  const fetchCategory = useCategoryStore((state) => state.fetchCategory);

  useEffect(() => {
    fetchCategory(categoryId);
  }, []);

  return { category, loading, errorMessage }
}

const CategoryView = ({ currentUser, settings, searchTerm, setSearchTerm }: any) => {
  const { category, loading, errorMessage } = (
    isZustandEnabled) ? CategoryViewZustand() : CategoryViewDefault();

  return (
    <>
      {
      (searchTerm === '') ? (
        <>
          <div className="container">
            <Category
              category={category}
              loading={loading}
              errorMessage={errorMessage}
              currentUser={currentUser}
              settings={settings}
              setSearchTerm={setSearchTerm}
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