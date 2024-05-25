import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";
import Footer from "../../components/Footer";
import CommentsService from "../../services/comments.service";
import PostsService from "../../services/posts.service";
import UsersService from "../../services/users.service";
import { ICommentArray, initICommentArray } from "../../interfaces/comment.interface";
import { IPostArray, initIPostArray } from "../../interfaces/post.interface";
import IUser, { initIUser } from "../../interfaces/user.interface";
import AuthService from "../../services/auth.service";


const UserView = () => {
  const { userId } = useParams();
  const [userRole, setUserRole] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [user, setUser] = useState<IUser>(initIUser);
  const [userComments, setUserComments] = useState<ICommentArray>(initICommentArray);
  const [userPosts, setUserPosts] = useState<IPostArray>(initIPostArray);

  useEffect(() => {
    setUserRole(AuthService.userRole());
    fetchUser();
    fetchComments(5);
    fetchPosts(5);
  }, []);

  const handleNavbarSearch = (term: string) => {
    setSearchTerm(term);
    fetchUsers(`?search=${term}`);
  }

  const fetchUser = () => {
    return UsersService.get(userId)
    .then((response: AxiosResponse) => {
      setUser(response.data as IUser);
    })
  }

  const fetchUsers = (term: string) => {
    return UsersService.search(`?search=${term}`)
    .then((response: AxiosResponse) => {
      setUser(response.data);
    })
  }

  const fetchComments = (limit: number | null = null) => {
    return CommentsService
      .getUserComments(userId, limit)
      .then((response: AxiosResponse) => {
        setUserComments(response.data as ICommentArray);
      })
  }

  const fetchPosts = (limit: number | null = null) => {
    return PostsService
      .getUserPosts(userId, limit)
      .then((response: AxiosResponse) => {
        setUserPosts(response.data as IPostArray);
      })
  }

  const renderUsers = () => {
    return (
      <div>
        <Profile
          user={user}
          comments={userComments}
          posts={userPosts}
          userRole={userRole}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar
        onSearch={handleNavbarSearch}
      />
      <div className="container mt-3">
        {
          searchTerm
          ?
          renderUsers()
          :
          <Profile
            user={user}
            comments={userComments}
            posts={userPosts}
            userRole={userRole}
          />
        }
      </div>
      <Footer />
    </>
  );
};

export default UserView;