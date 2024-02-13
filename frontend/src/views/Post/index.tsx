import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../../services/auth.service";
import PostsService from "../../services/posts.service";
import IPost, { initIPost } from "../../interfaces/post.interface";
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import { AuthResponse } from "../../interfaces/auth.interface";


const PostView = (): React.JSX.Element => {
  const { postId } = useParams();

  const [post, setPost] = useState<IPost>(initIPost);
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchPost();
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
    //fetchPosts(`?search=${term}`);
  }

  const fetchPost = () => {
    return PostsService.get(postId)
    .then((response: AxiosResponse) => {
      setPost(response.data);
    })
  }

  return (
    <div className="container">
      {<Navbar
        onSearch={handleNavbarSearch}
        />}
      {<Post
        post={post}
        userRole={
          (currentUser?.user?.role != null) &&
          (currentUser.user.role)}
      />}
    </div>
  );
};

export default PostView;