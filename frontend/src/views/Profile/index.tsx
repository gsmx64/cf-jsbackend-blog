import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import CommentsService from "../../services/comments.service";
import PostsService from "../../services/posts.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import { ICommentArray, initICommentArray } from "../../interfaces/comment.interface";
import { IPostArray, initIPostArray } from "../../interfaces/post.interface";
import PostsView from "../Posts";
import UsersService from "../../services/users.service";
import IUser, { initIUser } from "../../interfaces/user.interface";


const ProfileView = () => {
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [userRole, setUserRole] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [user, setUser] = useState<IUser>(initIUser);
  const [userComments, setUserComments] = useState<ICommentArray>(initICommentArray);
  const [userPosts, setUserPosts] = useState<IPostArray>(initIPostArray);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');
    setCurrentUser(AuthService.getCurrentUser());
    setUserRole(AuthService.userRole());

    fetchUser();
    fetchComments(currentUser.user.id, 5);
    fetchPosts(currentUser.user.id, 5);
  }, [user]);

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
  }

  const fetchUser = () => {
    return UsersService
    .get(currentUser.user.id)
    .then((response: AxiosResponse) => {
      setUser(response.data as IUser);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const fetchComments = (id: string, limit: number | null = null) => {
    return CommentsService
    .getUserComments(id, limit)
    .then((response: AxiosResponse) => {
      setUserComments(response.data as ICommentArray);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const fetchPosts = (id: string, limit: number | null = null) => {
    return PostsService
    .getUserPosts(id, limit)
    .then((response: AxiosResponse) => {
      setUserPosts(response.data as IPostArray);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
      {
        (searchTerm === '') ? (
          <>
            <Navbar
              onSearch={handleNavbarSearch}
            />
            <div className="container mt-3">
              <Profile
                user={user}
                comments={userComments}
                posts={userPosts}
                errorMessage={errorMessage}
                loading={loading}
                userRole={userRole}
              />
            </div>
            <Footer />
            </>
        ) : (
          <>
            <PostsView />
          </>
        )
      }
    </>
  );
};

export default ProfileView;