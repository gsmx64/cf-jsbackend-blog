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
import useCategoriesStore from "../../state/stores/categories";
import { isZustandEnabled } from "../../constants/defaultConstants";

const CategoriesViewDefault = () => {
  const [categories, setCategories] = useState<ICategoryArray>(initICategoryArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

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

  return { categories, currentPage, totalPages, totalItems, itemsPerPage, loading, errorMessage, currentUser, setCurrentPage }
}

const CategoriesViewZustand = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const currentPage = useCategoriesStore((state) => state.currentPage);
  const totalPages = useCategoriesStore((state) => state.totalPages);
  const totalItems = useCategoriesStore((state) => state.totalItems);
  const itemsPerPage = useCategoriesStore((state) => state.itemsPerPage);
  const loading = useCategoriesStore((state) => state.loading);
  const errorMessage = useCategoriesStore((state) => state.errorMessage);
  const setCurrentPage = useCategoriesStore((state) => state.setCurrentPage);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    fetchCategories(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { categories, currentPage, totalPages, totalItems, itemsPerPage, loading, errorMessage, currentUser, setCurrentPage }
}

const CategoriesView = () => {
  const { categories, currentPage, totalPages, totalItems, itemsPerPage, loading,
    errorMessage, currentUser, setCurrentPage } = (isZustandEnabled) ? CategoriesViewZustand() : CategoriesViewDefault();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term.toLowerCase());
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