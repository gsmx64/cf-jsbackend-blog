import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import UsersView from "../views/Users";
import { Suspense } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Loading from "../components/Loading";
import ErrorBoundaryErrorMessage from "../components/ErrorBoundary/components/ErrorMessage";


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
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
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'register',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <RegisterView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'profile',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <ProfileView />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: 'posts',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <PostsView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'post/:postId',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <PostView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'categories',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <CategoriesView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'category/:categoryId',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <CategoryView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'user/:userId',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <UserView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: 'users',
    element: AuthService.isLoggedIn() ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <UsersView />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorBoundaryErrorMessage />}>
          <LoginView />
        </ErrorBoundary>
      </Suspense>
    )
  }
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;