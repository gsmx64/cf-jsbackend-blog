import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Profile from "../../components/Profile";
import CommentsService from "../../services/comments.service";
import PostsService from "../../services/posts.service";
import { ICommentArray, initICommentArray } from "../../interfaces/comment.interface";
import { IPostArray, initIPostArray } from "../../interfaces/post.interface";
import { useParams } from "react-router-dom";
import UsersService from "../../services/users.service";
import IUser, { initIUser } from "../../interfaces/user.interface";
import Navbar from "../../components/Navbar";


const UserView = (): React.JSX.Element => {
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [user, setUser] = useState<IUser>(initIUser);
  const [userComments, setUserComments] = useState<ICommentArray>(initICommentArray);
  const [userPosts, setUserPosts] = useState<IPostArray>(initIPostArray);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    fetchUser();
    fetchComments(5);
    fetchPosts(5);
  }, []);

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
    //fetchPosts(`?search=${term}`);
  }  

  const fetchUser = () => {
    return UsersService.get(userId)
    .then((response: AxiosResponse) => {
      setUser(response.data);
      setIsLoading(false);
    })
    .catch((error: Error) => {
      setUser(initIUser);
      setError(error);
      setIsLoading(false);
    });
  }

  const fetchComments = (limit: number | null = null) => {
    return CommentsService
      .getUserComments(userId, limit)
      .then((response: AxiosResponse) => {
        setUserComments(response.data);
      })
  }

  const fetchPosts = (limit: number | null = null) => {
    return PostsService
      .getUserPosts(userId, limit)
      .then((response: AxiosResponse) => {
        setUserPosts(response.data);
        console.log(JSON.stringify(response.data));
      })
  }

  const renderUser = () => {
    if (isLoading) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="card text-white bg-danger mb-3" style={{maxWidth: 288}}>
          <div className="card-header">ERROR:</div>
          <div className="card-body">
            <h5 className="card-title">An error was found.</h5>
            <p className="card-text">`The error code was: {error.message}</p>
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <Profile
          user={user}
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
        {renderUser()}
      </div>
    </div>
  );
};

export default UserView;