import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import IPost, { initIPost } from '../interfaces/post.interface';
import { ICategoryArray, initICategoryArray } from "../interfaces/category.interface";
import PostsService from '../services/posts.service';
import CategoriesService from "../services/categories.service";



const usePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost>(initIPost);
  const [activeCategories, setActiveCategories] = useState<ICategoryArray>(initICategoryArray);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchPost = (id: string | undefined) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return postId ? PostsService
      .get(id)
      .then((response: AxiosResponse) => {
        setPost(response.data);
      })
      .catch((error: any) => {
        setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
      })
      .finally(() => {
        setLoading(false);
      }) : setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.toString());
    }
  }

  const fetchActiveCategories = () => {
    try {
      setErrorMessage('');
      setLoading(true);

      return CategoriesService
      .getAll(1, 1000)
      .then((response: AxiosResponse) => {
        setActiveCategories(response.data.data);
      })
      .catch((error: any) => {
        setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
      })
      .finally(() => {
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }

  const handleNewPostSaveClick = (data: any) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return PostsService
      .create({
        ...data,
        status: 'UNPUBLISHED',
        comments: []
      })
      .then((response: AxiosResponse) => {       
        if(response.data) {
          setAlertMessage(`Post ${response.data.title} created!`);
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

  const handleEditPostSaveClick = (id: string | undefined, data: any) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return PostsService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if(response.data) {
          setAlertMessage(`Post "${data.title}" created!`);
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
    fetchPost(postId);
    fetchActiveCategories();
  }, []);

  return { postId, post, loading, alertMessage, errorMessage,
    activeCategories, handleNewPostSaveClick, handleEditPostSaveClick };
};

export default usePost;