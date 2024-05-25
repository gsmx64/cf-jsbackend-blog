import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import Category from "../../components/Category";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import CategoriesService from "../../services/categories.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import ICategory, { initICategory } from "../../interfaces/category.interface";
import PostsView from "../Posts";


const CategoryView = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<ICategory>(initICategory);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

  useEffect(() => {
    fetchCategory();
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const fetchCategory = () => {
    setErrorMessage('');
    setLoading(true);

    return CategoriesService.get(categoryId)
    .then((response: AxiosResponse) => {
      setCategory(response.data);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
  }

  return (
    <>
      {
      (searchTerm === '') ? (
        <>
          <Navbar
            onSearch={handleNavbarSearch}
            ref={containerRef}
          />
          <div className="container">
            <Category
              data={category}
              errorMessage={errorMessage}
              loading={loading}
              userRole={
                (currentUser?.user?.role != null) && 
                (currentUser.user.role)}
            />
          </div>
          <Footer />
        </>
      ) : (
        <>
          <PostsView />
        </>
      )
      }
    </>
  );
};

export default CategoryView;