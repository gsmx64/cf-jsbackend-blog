import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import styles from "./Navbar.module.css";

import AuthService from "../../services/auth.service";
import { AuthResponse } from "../../interfaces/auth.interface";

/*export interface NavbarProps {
    onSearch: any
}*/

const Navbar = forwardRef(({ onSearch }: any, ref: any): React.JSX.Element => { 
  const [currentUser, setCurrentUser] = useState<AuthResponse | undefined>(undefined);

  const [search, setSearch] = useState<string>('');

  const envAppName: string = import.meta.env.VITE_APP_NAME || 'Blog';

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  useImperativeHandle(ref, () => ({
    search,
    setSearch,
  }));

  const handleInputChange = (event: any) => {
      setSearch(event.target.value);
  }

  const handleInputKeyDown = (event: any) => {
      if (event.key = 'Enter') {
          onSearch(search);
      }
  }

  const handleLogOutClick = (event: any) => {
    event.stopPropagation();
    AuthService.logout();
    setCurrentUser(undefined);
  }

  return (
    <div ref={ref}>
      <nav className="navbar navbar-expand navbar-dark bg-dark rounded">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 ps-1">       
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                Posts
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto order-0">
          <Link to={"/"} className="navbar-brand mx-auto">
            {envAppName}
          </Link>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 pe-1">
          <ul className="navbar-nav ms-auto">

            {currentUser ? (
              <>
              <li className="nav-item">
                <Link
                  to={"/profile"}
                  className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={handleLogOutClick}>
                  LogOut
                </a>
              </li>
              </>
            ) : (
              <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
              </>
            )}

            <li className="nav-item">
              <input
                placeholder="Buscar en el blog"
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                value={search}
                className={styles.navbarSearchInput}
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
});

export default Navbar;