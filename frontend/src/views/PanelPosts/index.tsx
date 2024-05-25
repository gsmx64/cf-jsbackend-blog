import { useState, useEffect, useRef } from "react";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import PanelPosts from "../../components/PanelPosts";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import PostsService from "../../services/posts.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import { IPostArray, initIPostArray } from "../../interfaces/post.interface";


/*
// Implementation of Zustand with Axios
import usePostsStore from "../../state/posts.store";

interface Error {
  err: unknown;
  isError: boolean;
  error?: Error;
  stack?: Error;
  message: string;
  toString(): string;
}

interface IUsePostsStore {
  postsData: IPost;
  postsIsLoading: boolean;
  postsError: Error | null | unknown;
  fetchPosts: (query: string | null) => void;
}
*/
const PanelPostsView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [posts, setPosts] = useState<IPostArray>(initIPostArray);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();
  
  useEffect(() => {
    fetchPosts(currentPage, itemsPerPage);
    setCurrentUser(AuthService.getCurrentUser());
  }, [currentPage, itemsPerPage]);

  const fetchPosts = (currentPage: number, itemsPerPage: number) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return PostsService
    .getAll(currentPage, itemsPerPage)
    .then((response: AxiosResponse) => {
      setPosts(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setTotalItems(response.data.meta.totalItems);
      setItemsPerPage(15);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleUpdateStatusPost = (id: string, status: string) => {
    const data = {status: status};
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return PostsService
    .update(id, data)
    .then((response: AxiosResponse) => {
      if (response.data.affected === 1) {
        setAlertMessage(`Status change to ${status} for post id: ${id}`);
      } else {  
        setErrorMessage(`Error changing status to post with id: ${id}. Post not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleDeletePost = (id: string) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return PostsService
    .remove(id)
    .then((response: AxiosResponse) => {
      if (response.data.affected === 1) {
        setAlertMessage(`Deleted post with id: ${id}.`);
      } else {  
        setErrorMessage(`Error deleting post with id: ${id}. Post not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term.toLowerCase());
  }

  return (
    <>
      <Navbar
        onSearch={handleNavbarSearch}
        ref={containerRef}
      />
      <div className="container">
        <PanelPosts
          data={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm}
          onUpdateStatusPost={handleUpdateStatusPost}
          onDeletePost={handleDeletePost}
          userRole={
            (currentUser?.user?.role != null) &&
            (currentUser.user.role)}
        />
      </div>
      <Footer />
    </>
  );
};

export default PanelPostsView;