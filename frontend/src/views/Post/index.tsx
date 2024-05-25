import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import PostsView from "../Posts";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import PostsService from "../../services/posts.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import IPost, { initIPost } from "../../interfaces/post.interface";


const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost>(initIPost);
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchPost();
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const handleNavbarSearch = (term: string) => {
    setSearchTerm(term);
  }

  const fetchPost = () => {
    setErrorMessage('');
    setLoading(true);

    return PostsService.get(postId)
    .then((response: AxiosResponse) => {
      setPost(response.data);
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
            <div className="container">
              <Post
                post={post}
                errorMessage={errorMessage}
                loading={loading}
                userRole={
                  (currentUser?.user?.role != null) &&
                  (currentUser.user.role)}
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

export default PostView;