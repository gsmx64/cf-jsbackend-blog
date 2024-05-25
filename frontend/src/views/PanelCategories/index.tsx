import { useState, useEffect, useRef } from "react";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import PanelCategories from "../../components/PanelCategories";
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
  categoriesData: ICategory;
  categoriesIsLoading: boolean;
  categoriesError: Error | null | unknown;
  fetchCategories: (query: string | null) => void;
}
*/
const PanelCategoriesView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [categories, setCategories] = useState<ICategoryArray>(initICategoryArray);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();
  
  useEffect(() => {
    fetchPosts(currentPage, itemsPerPage);
    setCurrentUser(AuthService.getCurrentUser());
  }, [currentPage, itemsPerPage]);

  const fetchPosts = (currentPage: number, itemsPerPage: number) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return CategoriesService
    .getAll(currentPage, itemsPerPage)
    .then((response: AxiosResponse) => {
      setCategories(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setTotalItems(response.data.meta.totalItems);
      setItemsPerPage(15);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleUpdateStatusCategory = (id: string, status: string) => {
    const data = {status: status};
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return CategoriesService
    .update(id, data)
    .then((response: AxiosResponse) => {
      if (response.data.affected === 1) {
        setAlertMessage(`Status change to ${status} for category id: ${id}`);
      } else {  
        setErrorMessage(`Error changing status to category with id: ${id}. Category not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleDeleteCategory = (id: string) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return CategoriesService
    .remove(id)
    .then((response: AxiosResponse) => {
      if (response.data.affected === 1) {
        setAlertMessage(`Deleted category with id: ${id}.`);
      } else {  
        setErrorMessage(`Error deleting category with id: ${id}. Category not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

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
        <PanelCategories
          data={categories}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm}
          onUpdateStatusCategory={handleUpdateStatusCategory}
          onDeleteCategory={handleDeleteCategory}
          userRole={
            (currentUser?.user?.role != null) &&
            (currentUser.user.role)}
        />
      </div>
      <Footer />
    </>
  );
};

export default PanelCategoriesView;