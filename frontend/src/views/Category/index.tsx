import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import CategoriesService from "../../services/categories.service";
import ICategory, { initICategory } from "../../interfaces/category.interface";
import Navbar from "../../components/Navbar";
import Category from "../../components/Category";
import AuthService from "../../services/auth.service";
import { AuthResponse } from "../../interfaces/auth.interface";


const CategoryView = (): React.JSX.Element => {
  const { categoryId } = useParams();
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

  const [category, setCategory] = useState<ICategory>(initICategory);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchCategory();
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const fetchCategory = () => {
    return CategoriesService.get(categoryId)
    .then((response: AxiosResponse) => {
      setCategory(response.data);
      setIsLoading(false);
    })
    .catch((error: Error) => {
      setCategory(initICategory);
      setError(error);
      setIsLoading(false);
    });
  }

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
  }
  
  if (isLoading && category) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-white bg-danger mb-3" style={{maxWidth: 288}}>
        <div className="card-header">ERROR:</div>
        <div className="card-body">
          <h5 className="card-title">An error was found.</h5>
          <p className="card-text">`The error code was: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {<Navbar
        onSearch={handleNavbarSearch}
        />}
      {<Category
        category={category}
        userRole={
          (currentUser?.user?.role != null) && 
          (currentUser.user.role)}
      />}
    </div>
  );
};

export default CategoryView;