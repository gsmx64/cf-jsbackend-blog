import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { initICommentArray, ICommentArray } from '../interfaces/comment.interface';
import CommentsService from '../services/comments.service';
import useCurrentUser from './useCurrentUser';


const useComments = () => {
  const { currentUser } = useCurrentUser();
  const [comments, setComments] = useState<ICommentArray>(initICommentArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchComments = (currentPage: number, itemsPerPage: number) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CommentsService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        setComments(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalItems(response.data.meta.totalItems);
        setItemsPerPage(response.data.meta.itemsPerPage);
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

  const handleDeleteComment = (id: string) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CommentsService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          setAlertMessage(`Comment deleted!`);
        } else {  
          setErrorMessage(`Error deleting comment! Comment not found.`);
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
    fetchComments(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { currentUser, comments, currentPage, totalPages, totalItems,
    itemsPerPage, loading, alertMessage, errorMessage, setCurrentPage,
    setItemsPerPage, handleDeleteComment };
};

export default useComments;