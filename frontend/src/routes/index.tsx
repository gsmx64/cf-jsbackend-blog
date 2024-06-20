import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthService from "../services/auth.service";
import RouteDefinition, { IProps } from "../interfaces/router.interface";
import ErrorBoundary from "../components/ErrorBoundary";
import HomeView from "../views/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Error401View from "../views/Error401";
import Error404View from "../views/Error404";
import Error500View from "../views/Error500";
import LoginView from "../views/Login";
import RegisterView from "../views/Register";
import ProfileView from "../views/Profile";
import PostsView from "../views/Posts";
import PostView from "../views/Post";
import CategoriesView from "../views/Categories";
import CategoryView from "../views/Category";
import UserView from "../views/User";
import PanelNewPostView from "../views/PanelNewPost";
import PanelPostsView from "../views/PanelPosts";
import PanelNewCategoryView from "../views/PanelNewCategory";
import PanelCategoriesView from "../views/PanelCategories";
import PanelCommentsView from "../views/PanelComments";
import PanelUsersView from "../views/PanelUsers";
import PanelSettingsView from "../views/PanelSettings";
import PanelEditCategoryView from "../views/PanelEditCategory";
import PanelEditCommentView from "../views/PanelEditComment";
import PanelEditPostView from "../views/PanelEditPost";
import SetupView from "../views/Setup";


const createRouteElementsFromObject = (
  routeDefinitions: RouteDefinition[],
  props: IProps) => {
  let routesArray: any = {};

  routesArray = routeDefinitions.map(({ urlPath, acl, search, Component,
    children, ComponentOnACLFail, ComponentOnError }) => (
      {
        path: urlPath,
        element: (
          (acl) ?
          (
            <Suspense fallback={null}>
              <ErrorBoundary>
                <Navbar
                  currentUser={props.currentUser}
                  settings={props.settings}
                  loading={props.loading}
                  alertMessage={props.alertMessage}
                  errorMessage={props.errorMessage}
                  handleChangePasswordSaveClick={props.handleChangePasswordSaveClick}
                  handleChangeAvatarSaveClick={props.handleChangeAvatarSaveClick}
                  handleLogOutClick={props.handleLogOutClick}
                  onSearch={search ? props.handleNavbarSearch : undefined}
                  ref={props.containerRef}
                />
                {(urlPath === 'login' || urlPath === 'register') ? (
                  <Component
                    currentUser={props.currentUser}
                    settings={props.settings}
                    loading={props.loading}
                    alertMessage={props.alertMessage}
                    errorMessage={props.errorMessage}
                    searchTerm={props.searchTerm}
                    setSearchTerm={props.setSearchTerm}
                    handleRegisterUserSaveClick={props.handleRegisterUserSaveClick}
                    handleLoginUserSaveClick={props.handleLoginUserSaveClick}
                  />
                ) : (
                  <Component
                    currentUser={props.currentUser}
                    settings={props.settings}
                    searchTerm={props.searchTerm}
                    setSearchTerm={props.setSearchTerm}
                  />
                )}
                <Footer
                  currentUser={props.currentUser}
                  settings={props.settings}
                />
              </ErrorBoundary>
            </Suspense>
          ) : (
            <Suspense fallback={null}>
              <ErrorBoundary>
                <Navbar
                  currentUser={props.currentUser}
                  settings={props.settings}
                  loading={props.loading}
                  alertMessage={props.alertMessage}
                  errorMessage={props.errorMessage}
                  handleChangePasswordSaveClick={props.handleChangePasswordSaveClick}
                  handleChangeAvatarSaveClick={props.handleChangeAvatarSaveClick}
                  handleLogOutClick={props.handleLogOutClick}
                  onSearch={undefined}
                  ref={props.containerRef}
                />
                <ComponentOnACLFail
                  settings={props.settings}
                />
                <Footer
                  currentUser={props.currentUser}
                  settings={props.settings}
                  handleRegisterUserSaveClick={props.handleRegisterUserSaveClick}
                  handleLoginUserSaveClick={props.handleLoginUserSaveClick}
                />
              </ErrorBoundary>
            </Suspense>
          )
        ),
        children: children?.length ? createRouteElementsFromObject(children, props) : [],
        errorElement: (
          (ComponentOnError) ? (
            <ErrorBoundary>
              <Navbar
                currentUser={props.currentUser}
                settings={props.settings}
                loading={props.loading}
                alertMessage={props.alertMessage}
                errorMessage={props.errorMessage}
                handleChangePasswordSaveClick={props.handleChangePasswordSaveClick}
                handleChangeAvatarSaveClick={props.handleChangeAvatarSaveClick}
                handleLogOutClick={props.handleLogOutClick}
                onSearch={undefined}
              />
              <ComponentOnError />
              <Footer
                currentUser={props.currentUser}
                settings={props.settings}
              />
            </ErrorBoundary>
          ) : ( <></> )
        ),
      }
  ));

  return <RouterProvider router={createBrowserRouter(routesArray)} />;
};

const routes: RouteDefinition[] = [
  {
    name: 'Home',
    urlPath: '/',
    acl: true,
    search: true,
    Component: HomeView,
    ComponentOnError: Error404View,
  },
  {
    name: 'Login',
    urlPath: 'login',
    acl: true,
    search: false,
    Component: LoginView,
  },
  {
    name: 'Register',
    urlPath: 'register',
    acl: true,
    search: false,
    Component: RegisterView,
  },
  {
    name: 'Current User Profile',
    urlPath: 'profile',
    acl: true,
    search: false,
    Component: ProfileView,
  },
  {
    name: 'Edit Current User Profile',
    urlPath: 'profile/edit',
    acl: true,
    search: false,
    Component: ProfileView,
  },
  {
    name: 'Posts',
    urlPath: 'posts',
    acl: true,
    search: true,
    Component: PostsView,
  },
  {
    name: 'Post',
    urlPath: 'post/:postId',
    acl: true,
    search: true,
    Component: PostView,
  },
  {
    name: 'Categories',
    urlPath: 'categories',
    acl: true,
    search: true,
    Component: CategoriesView,
  },
  {
    name: 'Category',
    urlPath: 'category/:categoryId',
    acl: true,
    search: true,
    Component: CategoryView,
  },
  {
    name: 'User Profile',
    urlPath: 'user/:userId',
    acl: (await AuthService.isLoggedIn()),
    search: false,
    Component: UserView,
    ComponentOnACLFail: LoginView,
  },
  {
    name: 'Edit User Profile',
    urlPath: 'user/edit/:userId',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])),
    search: false,
    Component: UserView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel New Post',
    urlPath: 'new-post',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR', 'EDITOR'])),
    search: false,
    Component: PanelNewPostView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel Posts List',
    urlPath: 'list-posts',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR', 'EDITOR'])),
    search: true,
    Component: PanelPostsView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel Edit Post',
    urlPath: 'edit-post/:postId',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR', 'EDITOR'])),
    search: false,
    Component: PanelEditPostView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel New Category',
    urlPath: 'new-category',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])),
    search: false,
    Component: PanelNewCategoryView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel Categories List',
    urlPath: 'list-categories',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])),
    search: true,
    Component: PanelCategoriesView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel Edit Category',
    urlPath: 'edit-category/:categoryId',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])),
    search: false,
    Component: PanelEditCategoryView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel Comments List',
    urlPath: 'list-comments',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])),
    search: true,
    Component: PanelCommentsView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel Edit Comment',
    urlPath: 'edit-comment/:commentId',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])),
    search: false,
    Component: PanelEditCommentView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel Users List',
    urlPath: 'list-users',
    acl: (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])),
    search: true,
    Component: PanelUsersView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Panel Settings',
    urlPath: 'settings',
    acl: (await AuthService.isAdmin()),
    search: false,
    Component: PanelSettingsView,
    ComponentOnACLFail: Error401View,
  },
  {
    name: 'Setup',
    urlPath: 'setup',
    acl: true,
    search: false,
    Component: SetupView,
  },
  {
    name: 'Error404',
    urlPath: '404',
    acl: true,
    search: false,
    Component: Error404View,
  },
  {
    name: 'Error500',
    urlPath: '500',
    acl: true,
    search: false,
    Component: Error500View,
  }
];

const MyRoutes = (props: IProps) => {
  return createRouteElementsFromObject(routes, props);
};

export default MyRoutes;