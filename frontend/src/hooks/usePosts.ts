import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { initIPostArray, IPostArray } from '../interfaces/post.interface';
import PostsService from '../services/posts.service';


const usePosts = () => {
  const [posts, setPosts] = useState<IPostArray>(initIPostArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchPosts = (currentPage: number, itemsPerPage: number) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return PostsService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        setPosts(response.data.data);
        setTotalPages(response.data?.meta?.totalPages);
        setTotalItems(response.data?.meta?.totalItems);
        setItemsPerPage(response.data?.meta?.itemsPerPage);
      })
      .catch((error: any) => {
        setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
      })
      .finally(() => {
        setLoading(false);
      });
    } catch (error: any) {
      setErrorMessage(error.toString());
    }
  }

  const handleUpdateStatusPost = (id: string, status: string, title: string) => {
    try {
      const data = {status: status};
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return PostsService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          setAlertMessage(`Status change to "${status}" for post: "${title}".`);
          fetchPosts(currentPage, itemsPerPage);
        } else {  
          setErrorMessage(`Error changing status to post: "${title}". Post not found.`);
        }
      })
      .catch((error: any) => {
        setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
      })
      .finally(() => {
        setLoading(false);
      });
    } catch (error: any) {
      setErrorMessage(error.toString());
    }
  }

  const handleDeletePost = (id: string, title: string) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return PostsService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          setAlertMessage(`Deleted post: "${title}".`);
          fetchPosts(currentPage, itemsPerPage);
        } else {  
          setErrorMessage(`Error deleting post: "${title}". Post not found.`);
        }
      })
      .catch((error: any) => {
        setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
      })
      .finally(() => {
        setLoading(false);
      });
    } catch (error: any) {
      setErrorMessage(error.toString());
    }
  }

  useEffect(() => {
    fetchPosts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { posts, currentPage, totalPages, totalItems,
    itemsPerPage, loading, alertMessage, errorMessage, setCurrentPage,
    setItemsPerPage, handleUpdateStatusPost, handleDeletePost };
};

export default usePosts;