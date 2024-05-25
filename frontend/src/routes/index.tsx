import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import AuthService from "../services/auth.service";
import HomeView from "../views/Home";
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
import SettingsView from "../views/Settings";

import ErrorBoundary from "../components/ErrorBoundary";
import Loading from "../components/Loading";


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <HomeView />
        </ErrorBoundary>
      </Suspense>
    ),
    errorElement: <Error404View />
  },
  {
    path: 'login',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'register',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <RegisterView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'profile',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <ProfileView />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: 'profile/edit',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <ProfileView />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: 'posts',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PostsView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'post/:postId',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PostView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'categories',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <CategoriesView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'category/:categoryId',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <CategoryView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'user/:userId',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <UserView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'user/edit/:userId',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <ProfileView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'new-post',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PanelNewPostView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'list-posts',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PanelPostsView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'new-category',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PanelNewCategoryView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'list-categories',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PanelCategoriesView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },  
  {
    path: 'list-comments',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PanelCommentsView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'list-users',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PanelUsersView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'settings',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <SettingsView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  }
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;