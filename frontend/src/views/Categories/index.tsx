import { useState, useEffect, useRef } from "react";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import CategoriesService from "../../services/categories.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import { ICategoryArray, initICategoryArray } from "../../interfaces/category.interface";


/*
// Implementation of Zustand with Axios
import usePostsStore from "../../state/categories.store";

interface Error {
  err: unknown;
  isError: boolean;
  error?: Error;
  stack?: Error;
  message: string;
  toString(): string;
}

interface IUseCategoriesStore {
  postsData: ICategories;
  postsIsLoading: boolean;
  postsError: Error | null | unknown;
  fetchCategories: (query: string | null) => void;
}
*/
const CategoriesView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [categories, setCategories] = useState<ICategoryArray>(initICategoryArray);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

  useEffect(() => {
    fetchCategories(currentPage, itemsPerPage);
    setCurrentUser(AuthService.getCurrentUser());
  }, [currentPage, itemsPerPage]);

  const fetchCategories = (currentPage: number, itemsPerPage: number) => {
    setErrorMessage('');
    setLoading(true);

    return CategoriesService.getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        setCategories(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalItems(response.data.meta.totalItems);
        setItemsPerPage(response.data.meta.itemsPerPage);
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
      <Navbar
        onSearch={handleNavbarSearch}
        ref={containerRef}
      />
      <div className="container">
        <Categories
          data={categories}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm.toLowerCase()}
          userRole={
            (currentUser?.user?.role != null) && 
            (currentUser.user.role)}
        />
      </div>
      <Footer />
    </>
  );
};

export default CategoriesView;