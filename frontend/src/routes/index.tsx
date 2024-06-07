import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthService from "../services/auth.service";
import ErrorBoundary from "../components/ErrorBoundary";
import HomeView from "../views/Home";
import Error401View from "../views/Error401";
import Error404View from "../views/Error404";
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
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


type RouteDefinition = {
  name: string;
  urlPath: string;
  acl: boolean | undefined;
  search?: boolean;
  Component: React.ComponentType<React.PropsWithChildren> | any;
  children?: RouteDefinition[];
  ComponentOnACLFail?: React.ComponentType<React.PropsWithChildren> | any;
  ComponentOnError?: React.ComponentType<React.PropsWithChildren> | any;
};

const createRouteElementsFromObject = (
  routeDefinitions: RouteDefinition[],
  searchTerm: string,
  setSearchTerm: any,
  handleNavbarSearch: any,
  containerRef: any) => {
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
                  onSearch={search ? handleNavbarSearch : undefined}
                  ref={containerRef}
                />
                <Component
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <Footer />
              </ErrorBoundary>
            </Suspense>
          ) : (
            <Suspense fallback={null}>
              <ErrorBoundary>
                <Navbar onSearch={undefined} />
                <ComponentOnACLFail />
                <Footer />
              </ErrorBoundary>
            </Suspense>
          )
        ),
        children: children?.length ? createRouteElementsFromObject(children, '', '', '', '') : [],
        errorElement: (
          (ComponentOnError) ? (
            <ErrorBoundary>
              <Navbar />
              <ComponentOnError />
              <Footer />
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
  }
];

const MyRoutes =  (searchTerm: string, setSearchTerm: any, handleNavbarSearch: any, containerRef: any) => {
  return createRouteElementsFromObject(routes, searchTerm, setSearchTerm, handleNavbarSearch, containerRef)
};

export default MyRoutes;