import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import PanelNewCategoryForm from "../../components/PanelNewCategoryForm";
import CategoriesView from "../Categories";


const PanelNewCategoryView = () => {
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
  }

  const handleNewCategoryCancelClick = () => {
    navigate(`/categories`);
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
            <PanelNewCategoryForm
              userRole={
                (currentUser?.user?.role != null) && 
                (currentUser.user.role)}
              onNewCategoryCancelClick={handleNewCategoryCancelClick}
            />
          </div>
          <Footer />
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

export default PanelNewCategoryView;