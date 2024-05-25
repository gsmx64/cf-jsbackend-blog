import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthResponse } from "../../interfaces/auth.interface";
import AuthService from "../../services/auth.service";
import BootstrapLink from "../BootstrapLink";
import { DEFAULT_NO_AVATAR_TINY } from "../../constants/defaultConstants";


const Navbar = forwardRef(({ onSearch }: any, ref: any) => { 
  const [currentUser, setCurrentUser] = useState<AuthResponse | undefined>(undefined);
  const [search, setSearch] = useState<string>('');
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [panelDropdown, setPanelDropdown] = useState(false);

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
    <div ref={ref} className="search">
      <BootstrapLink />
      <nav className="navbar navbar-expand navbar-dark bg-dark rounded">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 ps-1">       
          <ul className="navbar-nav me-auto">
            <li className="nav-item ms-2">
              <Link to={"/"} className="nav-link">
                <i className="bi bi-house"></i>
                <div>Home</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                <i className="bi bi-tags"></i>
                <div>Categories</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                <i className="bi bi-file-earmark-post pb-1 pe-2"></i>
                <div>Posts</div>
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
          <ul className="navbar-nav ms-auto menus">
            <li className="nav-item">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"></i>
                </span>             
                <input
                  id="search"
                  placeholder="Buscar en el blog"
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  value={search}
                  className="form-control"
                />
              </div>
            </li>
            {
              !currentUser && 
              (
                <>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      <i className="bi bi-box-arrow-in-right"></i>
                      <div>Login</div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      <i className="bi bi-door-open"></i>
                      <div>Register</div>
                    </Link>
                  </li>
                </>
              )
            }
            {
              (
                (currentUser?.user.role === 'ADMIN') ||
                (currentUser?.user.role === 'MODERATOR') ||
                (currentUser?.user.role === 'EDITOR')
              ) &&
              (
                <>
                  <li className="nav-item">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={panelDropdown ? "true" : "false"}
                      onClick={() => setPanelDropdown((prev) => !prev)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-shield-check" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                        <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                      </svg>
                      <div>Panel</div>
                    </button>
                    <ul className={`dropdown ${panelDropdown ? "show" : ""}`}>
                      <li className="menu-items">
                        <Link to={"/new-post"} className="nav-link">
                          <i className="bi bi-file-post"></i>
                          <span className="ms-2">New Post</span>
                        </Link>
                      </li>
                      <li className="menu-items">
                        <Link to={"/list-posts"} className="nav-link">
                          <i className="bi bi-stickies"></i>
                          <span className="ms-2">List Posts</span>
                        </Link>
                      </li>
                      <li className="menu-items">
                        <Link to={"/new-category"} className="nav-link">
                          <i className="bi bi-tag-fill"></i>
                          <span className="ms-2">New Category</span>
                        </Link>
                      </li>
                      <li className="menu-items">
                        <Link to={"/list-categories"} className="nav-link">
                          <i className="bi bi-tags"></i>
                          <span className="ms-2">List Categories</span>
                        </Link>
                      </li>
                      <li className="menu-items">
                        <Link to={"/list-users"} className="nav-link">
                          <i className="bi bi-people-fill"></i>
                          <span className="ms-2">List Users</span>
                        </Link>
                      </li>
                      <li className="menu-items">
                        <Link to={"/list-comments"} className="nav-link">
                          <i className="bi bi-chat-dots"></i>
                          <span className="ms-2">Moderate Comments</span>
                        </Link>
                      </li>
                      <li className="menu-items">
                        <Link to={"/settings"} className="nav-link">
                          <i className="bi bi bi-gear"></i>
                          <span className="ms-2">Blog Settings</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )
            }
            {
              currentUser &&
              (
                <>
                  <li className="nav-item">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={profileDropdown ? "true" : "false"}
                      onClick={() => setProfileDropdown((prev) => !prev)}
                    >
                      <img
                        src={currentUser.user.avatar ? currentUser.user.avatar : DEFAULT_NO_AVATAR_TINY}
                        className="rounded-circle img-thumbnail"
                        style={{height:26,width:26}}
                        alt="User Panel"
                      />
                      <div>{currentUser.user.username}</div>
                    </button>
                    <ul className={`dropdown ${profileDropdown ? "show" : ""}`}>
                      <li className="menu-items">
                        <Link
                          to={"/profile"}
                          className="nav-link"
                        >
                          <i className="bi bi-person-lines-fill"></i>
                          <span className="ms-2">Profile</span>
                        </Link>
                      </li>
                      <li className="menu-items">
                        <a href="/login" className="nav-link" onClick={handleLogOutClick}>
                          <i className="bi bi-box-arrow-right"></i>
                          <span className="ms-2">LogOut</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </nav>
    </div>
  );
});

export default Navbar;