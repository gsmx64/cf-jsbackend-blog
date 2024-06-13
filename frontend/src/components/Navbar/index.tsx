import { ChangeEvent, forwardRef, KeyboardEvent,
  useEffect,
  useImperativeHandle, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toggle } from 'react-hook-theme';
import 'react-hook-theme/dist/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BootstrapLink from '../BootstrapLink';
import { DEFAULT_NO_AVATAR_TINY } from '../../constants/defaultConstants';
import ChangePassword from '../ChangePassword';
import ChangeAvatar from '../ChangeAvatar';


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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories"} className="nav-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                  <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/>
                  <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/>
                </svg>
                <span>Categories</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/posts"} className="nav-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-earmark-post" viewBox="0 0 16 16">
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                  <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1-.5-.5"/>
                </svg>
                <span>Posts</span>
              </Link>
            </li>
            <li className="nav-item pt-1 ps-2">
              <Toggle />
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                      </svg>
                      <span>Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-btn mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
                        <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/>
                      </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-shield-check" viewBox="0 0 16 16">
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
                        style={{height:26,width:26}}
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