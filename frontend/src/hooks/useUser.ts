import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import IUser, { initIUser } from '../interfaces/user.interface';
import UsersService from '../services/users.service';
import CommentsService from '../services/comments.service';
import PostsService from '../services/posts.service';
import { ICommentArray, initICommentArray } from '../interfaces/comment.interface';
import { initIPostArray, IPostArray } from '../interfaces/post.interface';


const useUser = (uId: string) => {
  const [user, setUser] = useState<IUser>(initIUser);
  const [userComments, setUserComments] = useState<ICommentArray>(initICommentArray);
  const [userPosts, setUserPosts] = useState<IPostArray>(initIPostArray);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchUser = (id: string | undefined) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return UsersService
      .get(id)
      .then((response: AxiosResponse) => {
        setUser(response.data);
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

  const fetchUserComments = (id: string | undefined, limit: number | null = null) => {
    try {
      setAlertMessage('');
      setErrorMessage('');setLoading(false);
      setLoading(true);

      return CommentsService
      .getUserComments(id, limit)
      .then((response: AxiosResponse) => {
        setUserComments(response.data);
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

  const fetchUserPosts = (id: string | undefined, limit: number | null = null) => {
    try {
      setAlertMessage('');
      setErrorMessage('');setLoading(false);
      setLoading(true);
      
      return PostsService
      .getUserPosts(id, limit)
      .then((response: AxiosResponse) => {
        setUserPosts(response.data);
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

  const handleEditUserSaveClick = (id: string, data: any) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return UsersService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if(response.data.affected === 1) {
          setAlertMessage('Profile updated!');
          setUser({
              ...user,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              age: data.age,
              city: data.city,
              country: data.country,
          });
        } else {
          setErrorMessage(response.toString()+" :: "+JSON.stringify(response));
        }
      })
      .catch((error: any) => {
        setLoading(false);
        setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
      })
      .finally(() => {
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser(uId);
    fetchUserComments(uId, 5);
    fetchUserPosts(uId, 5);
  }, []);

  return { user, userComments, userPosts, loading,
    alertMessage, errorMessage, handleEditUserSaveClick
   };
};

export default useUser;