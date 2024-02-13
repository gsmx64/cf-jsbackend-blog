import React, { useEffect, useState } from "react";
import { AxiosResponse } from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import Profile from "../../components/Profile";
import AuthService from "../../services/auth.service";
import CommentsService from "../../services/comments.service";
import PostsService from "../../services/posts.service";
import { ICommentArray, initICommentArray } from "../../interfaces/comment.interface";
import { IPostArray, initIPostArray } from "../../interfaces/post.interface";
import { AuthResponse } from "../../interfaces/auth.interface";
import Navbar from "../../components/Navbar";


const ProfileView = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [userComments, setUserComments] = useState<ICommentArray>(initICommentArray);
  const [userPosts, setUserPosts] = useState<IPostArray>(initIPostArray);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    fetchComments(currentUser.user.id, 5);
    fetchPosts(currentUser.user.id, 5);
  }, []);

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
    //fetchPosts(`?search=${term}`);
  }

  const fetchComments = (id: string, limit: number | null = null) => {
    return CommentsService
      .getUserComments(id, limit)
      .then((response: AxiosResponse) => {
        setUserComments(response.data as ICommentArray);
      })
  }

  const fetchPosts = (id: string, limit: number | null = null) => {
    return PostsService
      .getUserPosts(id, limit)
      .then((response: AxiosResponse) => {
        setUserPosts(response.data as IPostArray);
      })
  }

  const renderProfile = () => {
    return (
      <div>
        <Profile
          user={currentUser.user}
          comments={userComments}
          posts={userPosts}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="search">
        {<Navbar onSearch={handleNavbarSearch} />}
      </div>
      <div className="mt-3">
        {renderProfile()}
      </div>
    </div>
  );
};

export default ProfileView;