import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import IComment, { ICommentCreate, initIComment } from '../interfaces/comment.interface';
import CommentsService from '../services/comments.service';
import { useParams } from 'react-router-dom';


const useComment = (getData: boolean = true) => {
  const { commentId } = useParams();
  const [comment, setComment] = useState<IComment>(initIComment);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchComment = (commentId: string | undefined) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CommentsService
      .get(commentId)
      .then((response: AxiosResponse) => {
        if(response.data) {
          setComment(response.data);
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
  
  const handleEditCommentSaveClick = (id: string | undefined, data: any) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CommentsService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if(response.data) {
          setAlertMessage(`Comment "${data.title}" edited!`);
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

  const handleNewCommentSaveClick = (id: string, data: ICommentCreate) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CommentsService
      .create({
        ...data,
        post: id,
      })
      .then((response: AxiosResponse) => {
        if(response.data) {
          setAlertMessage(`Comment created!`);
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
    getData && fetchComment(commentId);
  }, []);

  return { commentId, comment, loading, alertMessage, errorMessage,
    handleEditCommentSaveClick, handleNewCommentSaveClick };
};

export default useComment;