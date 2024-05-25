import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import PanelNewPostForm from "../../components/PanelNewPostForm";
import PostsView from "../Posts";
import { ICategoryArray, initICategoryArray } from "../../interfaces/category.interface";
import CategoriesService from "../../services/categories.service";


const PanelNewPostView = () => {
  const [categories, setCategories] = useState<ICategoryArray>(initICategoryArray);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories(1, 100);
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const fetchCategories = (currentPage: number, itemsPerPage: number) => {
    setErrorMessage('');
    setLoading(true);

    return CategoriesService.getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        setCategories(response.data.data);
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

  const handleNewPostCancelClick = () => {
    navigate(`/posts`);
  };

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
            <PanelNewPostForm
              categories={categories}
              error={errorMessage}
              loading={loading}
              userRole={
                (currentUser?.user?.role != null) && 
                (currentUser.user.role)}
              onNewPostCancelClick={handleNewPostCancelClick}
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

export default PanelNewPostView;