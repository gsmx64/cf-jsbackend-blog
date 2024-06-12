import { ChangeEvent, forwardRef, KeyboardEvent,
  useEffect,
  useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import BootstrapLink from "../BootstrapLink";
import { DEFAULT_NO_AVATAR_TINY } from "../../constants/defaultConstants";
import ChangePassword from "../ChangePassword";
import ChangeAvatar from "../ChangeAvatar";


const Navbar = forwardRef(({ currentUser, loading, alertMessage, errorMessage,
  settings, handleChangePasswordSaveClick, handleChangeAvatarSaveClick,
  handleLogOutClick, onSearch }: any, ref: any) => {
  const [search, setSearch] = useState<string>('');
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [panelDropdown, setPanelDropdown] = useState(false);
  const [avatarUser, setAvatarUser] = useState<string>(currentUser?.avatar);

  useImperativeHandle(ref, () => ({
    search,
    setSearch,
  }));

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key = 'Enter') {
      (onSearch !== undefined) && onSearch(search);
    }
  }

  useEffect(() => {
    setAvatarUser(currentUser?.avatar);
  }, [currentUser?.avatar]);

  return (
    <div ref={ref} className="search">
      <BootstrapLink />
      <nav className="navbar navbar-expand navbar-dark bg-dark rounded">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 ps-1">       
          <ul className="navbar-nav me-auto">
            <li className="nav-item ms-2">
              <Link to={"/"} className="nav-btn">
                <i className="bi bi-house"></i>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories"} className="nav-btn">
                <i className="bi bi-tags"></i>
                <span>Categories</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/posts"} className="nav-btn">
                <i className="bi bi-file-earmark-post"></i>
                <span>Posts</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto order-0">
          <Link to={"/"} className="navbar-brand mx-auto">
            {settings.brand ? settings.brand : ''}
          </Link>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 pe-1">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <div className="input-group pe-2">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"></i>
                </span>
                {((onSearch === undefined)) ?
                  (
                    <input
                      id="nosearch"
                      placeholder="Buscar en el blog"
                      value=""
                      disabled
                      className="form-control"
                    />
                  ) : (
                    <input
                      id="search"
                      placeholder="Buscar en el blog"
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                      value={search || ''}
                      className="form-control"
                    />
                  )
                }
              </div>
            </li>
            {
              (
                (currentUser === undefined)
              ) && 
              (
                <>
                  <li className="nav-item pb-1 ms-2">
                    <Link to={"/login"} className="nav-btn mt-1">
                      <i className="bi bi-box-arrow-in-right"></i>
                      <span>Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-btn mt-1">
                      <i className="bi bi-door-open"></i>
                      <span>Register</span>
                    </Link>
                  </li>
                </>
              )
            }
            {
              (
                (currentUser?.role === 'ADMIN') ||
                (currentUser?.role === 'MODERATOR') ||
                (currentUser?.role === 'EDITOR')
              ) &&
              (
                <>
                  <li className="nav-item">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={panelDropdown ? "true" : "false"}
                      onClick={() => setPanelDropdown((prev) => !prev)}
                      className="nav-btn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-shield-check" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                        <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                      </svg>
                      <span>Panel</span>
                    </button>
                    <ul className={`dropdown ${panelDropdown ? "show" : ""}`}>
                    {(
                        (currentUser?.role === 'ADMIN') ||
                        (currentUser?.role === 'MODERATOR') ||
                        (currentUser?.role === 'EDITOR')
                      ) && (
                        <li className="nav-item-menu">
                          <Link to={"/new-post"}>
                            <i className="bi bi-file-post"></i>
                            <span className="ms-2">New Post</span>
                          </Link>
                        </li>
                      )}
                      {(
                        (currentUser?.role === 'ADMIN') ||
                        (currentUser?.role === 'MODERATOR') ||
                        (currentUser?.role === 'EDITOR')
                      ) && (
                        <li className="nav-item-menu">
                          <Link to={"/list-posts"}>
                            <i className="bi bi-stickies"></i>
                            <span className="ms-2">List Posts</span>
                          </Link>
                        </li>
                      )}
                      {(
                        (currentUser?.role === 'ADMIN') ||
                        (currentUser?.role === 'MODERATOR')
                      ) && (
                        <li className="nav-item-menu">
                          <Link to={"/new-category"}>
                            <i className="bi bi-tag-fill"></i>
                            <span className="ms-2">New Category</span>
                          </Link>
                        </li>
                      )}
                      {(
                        (currentUser?.role === 'ADMIN') ||
                        (currentUser?.role === 'MODERATOR')
                      ) && (
                        <li className="nav-item-menu">
                          <Link to={"/list-categories"}>
                            <i className="bi bi-tags"></i>
                            <span className="ms-2">List Categories</span>
                          </Link>
                        </li>
                      )}
                      {(
                        (currentUser?.role === 'ADMIN') ||
                        (currentUser?.role === 'MODERATOR')
                      ) && (
                        <li className="nav-item-menu">
                          <Link to={"/list-users"}>
                            <i className="bi bi-people-fill"></i>
                            <span className="ms-2">List Users</span>
                          </Link>
                        </li>
                      )}
                      {(
                        (currentUser?.role === 'ADMIN') ||
                        (currentUser?.role === 'MODERATOR')
                      ) && (
                        <li className="nav-item-menu">
                          <Link to={"/list-comments"}>
                            <i className="bi bi-chat-dots"></i>
                            <span className="ms-2">Moderate Comments</span>
                          </Link>
                        </li>
                      )}
                      {(currentUser?.role === 'ADMIN') && (
                        <li className="nav-item-menu">
                          <Link to={"/settings"}>
                            <i className="bi bi bi-gear"></i>
                            <span className="ms-2">Blog Settings</span>
                          </Link>
                        </li>
                      )}
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
                      className="nav-btn"
                    >
                      <img
                        src={avatarUser ? avatarUser : DEFAULT_NO_AVATAR_TINY}
                        className="rounded-circle border border-2 border-light"
                        style={{height:28,width:28}}
                        alt="User Panel"
                      />
                      <span>{currentUser?.username}</span>
                    </button>
                    <ul className={`dropdown ${profileDropdown ? "show" : ""}`}>
                      <li className="nav-item-menu">
                        <Link to={"/profile"}>
                          <i className="bi bi-person-lines-fill"></i>
                          <span className="ms-2">Profile</span>
                        </Link>
                      </li>
                      <li className="nav-item-menu">
                        <ChangePassword
                          loading={loading}
                          alertMessage={alertMessage}
                          errorMessage={errorMessage}
                          onChangePasswordSaveClick={handleChangePasswordSaveClick}
                        />
                      </li>
                      <li className="nav-item-menu">
                        <ChangeAvatar
                          loading={loading}
                          alertMessage={alertMessage}
                          errorMessage={errorMessage}
                          onChangeAvatarSaveClick={handleChangeAvatarSaveClick}
                        />
                      </li>
                      <li className="nav-item-menu">
                        <a href="/login" onClick={handleLogOutClick}>
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