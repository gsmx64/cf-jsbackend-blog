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
import usePostsStore from "../../state/stores/posts";
import { isZustandEnabled } from "../../constants/defaultConstants";


const PanelPostsViewDefault = () => {
  const [posts, setPosts] = useState<IPostArray>(initIPostArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

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

  return { posts, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage,
    handleUpdateStatusPost, handleDeletePost }
}

const PanelPostsViewZustand = () => {
  const posts = usePostsStore((state) => state.posts);
  const currentPage = usePostsStore((state) => state.currentPage);
  const totalPages = usePostsStore((state) => state.totalPages);
  const totalItems = usePostsStore((state) => state.totalItems);
  const itemsPerPage = usePostsStore((state) => state.itemsPerPage);
  const loading = usePostsStore((state) => state.loading);
  const alertMessage = usePostsStore((state) => state.alertMessage);
  const errorMessage = usePostsStore((state) => state.errorMessage);
  const setCurrentPage = usePostsStore((state) => state.setCurrentPage);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);
  const handleUpdateStatusPost = usePostsStore((state) => state.handleUpdateStatusPost);
  const handleDeletePost = usePostsStore((state) => state.handleDeletePost);
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    fetchPosts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { posts, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage,
    handleUpdateStatusPost, handleDeletePost }
}

const PanelPostsView = () => {
  const { posts, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, currentUser, setCurrentPage,
    handleUpdateStatusPost, handleDeletePost
  } = (isZustandEnabled) ? PanelPostsViewZustand() : PanelPostsViewDefault();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

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