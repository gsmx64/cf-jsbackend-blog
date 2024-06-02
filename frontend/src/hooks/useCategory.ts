import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { initICategoryArray, ICategoryArray } from '../interfaces/category.interface';
import CategoriesService from '../services/categories.service';
import useCurrentUser from './useCurrentUser';


const useCategory = () => {
  const { categoryId } = useParams();
  const { currentUser } = useCurrentUser();
  const [category, setCategory] = useState<ICategoryArray>(initICategoryArray);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchCategory = (id: string | undefined) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return categoryId ? CategoriesService
      .get(id)
      .then((response: AxiosResponse) => {
        setCategory(response.data);
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

  const handleNewCategorySaveClick = (data: any) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CategoriesService
      .create({
        ...data,
        status: 'UNPUBLISHED',
        posts: []
      })
      .then((response: AxiosResponse) => {
        setLoading(false);        
        if(response.data) {
          setAlertMessage(`Category ${response.data.title} created!`);
        }
      })
      .catch((error: any) => {
        setLoading(false);
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
    fetchCategory(categoryId);
  }, []);

  return { currentUser, categoryId, category, loading, alertMessage,
    errorMessage, handleNewCategorySaveClick };
};

export default useCategory;