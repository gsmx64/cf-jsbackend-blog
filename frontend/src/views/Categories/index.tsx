import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactPaginate from "react-paginate";
import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import CategoriesService from "../../services/categories.service";
import AuthService from "../../services/auth.service";
import { ICategoryArray, initICategoryArray } from "../../interfaces/category.interface";
import Navbar from "../../components/Navbar";
import Categories from "../../components/Categories";
import styles from "./Categories.module.css";
import { AuthResponse } from "../../interfaces/auth.interface";


const CategoriesView = (): React.JSX.Element => {
  const [categories, setCategories] = useState<ICategoryArray>(initICategoryArray);
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

  useEffect(() => {
    fetchCategories();
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const fetchCategories = () => {
    return CategoriesService.getAll()
      .then((response: AxiosResponse) => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setCategories(initICategoryArray);
        setError(error);
        setIsLoading(false);
      });
  }

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
    //fetchCategories(`?search=${term}`);
  }

  const handlePageClick = useCallback(({ selected }: any) => {
    //fetchCategories(`?search=${searchTerm}&page=${selected}`);
  }, [searchTerm, fetchCategories]);

  const renderCategories = () => {
    if (isLoading) {
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
      <div>
          <Categories
            categories={categories}
            userRole={
              (currentUser?.user?.role != null) && 
              (currentUser.user.role)}
          />
          <ReactPaginate
              className={styles.pagination}
              nextClassName={styles.next}
              previousClassName={styles.previous}
              pageClassName={styles.page}
              activeClassName={styles.activePage}
              disabledClassName={styles.disabledPage}
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={categories.meta.totalPages}
              previousLabel="<"
              renderOnZeroPageCount={null}
          />
      </div>
    );
  }

  return (
    <div className="container">
      {<Navbar
        onSearch={handleNavbarSearch}
        ref={containerRef}
        />}
      {renderCategories()}
    </div> 
  );
};

export default CategoriesView;