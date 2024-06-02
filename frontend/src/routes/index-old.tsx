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


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <HomeView />
      </ErrorBoundary>
    ),
    errorElement: <Error404View />
  },
  {
    path: 'login',
    element: (
      <ErrorBoundary>
        <LoginView />
      </ErrorBoundary>
    )
  },
  {
    path: 'register',
    element: (
      <ErrorBoundary>
        <RegisterView />
      </ErrorBoundary>
    )
  },
  {
    path: 'profile',
    element: (
      <ErrorBoundary>
        <ProfileView />
      </ErrorBoundary>
    ),
  },
  {
    path: 'profile/edit',
    element: (
      <ErrorBoundary>
        <ProfileView />
      </ErrorBoundary>
    ),
  },
  {
    path: 'posts',
    element: (
      <ErrorBoundary>
        <PostsView />
      </ErrorBoundary>
    )
  },
  {
    path: 'post/:postId',
    element: (
      <ErrorBoundary>
        <PostView />
      </ErrorBoundary>
    )
  },
  {
    path: 'categories',
    element: (
      <ErrorBoundary>
        <CategoriesView />
      </ErrorBoundary>
    )
  },
  {
    path: 'category/:categoryId',
    element: (
      <ErrorBoundary>
        <CategoryView />
      </ErrorBoundary>
    )
  },
  {
    path: 'user/:userId',
    element: AuthService.isLoggedIn() ?
    (
      <ErrorBoundary>
        <UserView />
      </ErrorBoundary>
    ) : (
      <ErrorBoundary>
        <LoginView />
      </ErrorBoundary>
    )
  },
  {
    path: 'user/edit/:userId',
    element:
    (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])) ?
      (
        <ErrorBoundary>
          <ProfileView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'new-post',
    element:
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR', 'EDITOR'])) ?
      (
        <ErrorBoundary>
          <PanelNewPostView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'list-posts',
    element:
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR', 'EDITOR'])) ?
      (
        <ErrorBoundary>
          <PanelPostsView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'edit-post/:postId',
    element:
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR', 'EDITOR'])) ?
      (
        <ErrorBoundary>
          <PanelEditPostView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'new-category',
    element:
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])) ?
      (
        <ErrorBoundary>
          <PanelNewCategoryView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  
  {
    path: 'list-categories',
    element:
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])) ?
      (
        <ErrorBoundary>
          <PanelCategoriesView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'edit-category/:categoryId',
    element:
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])) ?
      (
        <ErrorBoundary>
          <PanelEditCategoryView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'list-comments',
    element:
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])) ?
      (
        <ErrorBoundary>
          <PanelCommentsView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'edit-comment/:commentId',
    element: 
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])) ?
      (
        <ErrorBoundary>
          <PanelEditCommentView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'list-users',
    element: 
      (await AuthService.isRoleAuthorized(['ADMIN', 'MODERATOR'])) ?
      (
        <ErrorBoundary>
          <PanelUsersView />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  },
  {
    path: 'settings',
    element: 
      (await AuthService.isAdmin()) ?
      (
          <ErrorBoundary>
            <PanelSettingsView />
          </ErrorBoundary>
      ) :
      (
        <ErrorBoundary>
          <Error401View />
        </ErrorBoundary>
      )
  }
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;