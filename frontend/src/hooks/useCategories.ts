import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { initICategoryArray, ICategoryArray } from '../interfaces/category.interface';
import CategoriesService from '../services/categories.service';


const useCategories = () => {
  const [categories, setCategories] = useState<ICategoryArray>(initICategoryArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchCategories = (currentPage: number, itemsPerPage: number) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CategoriesService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        setCategories(response.data.data);
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

  const handleUpdateStatusCategory = (id: string, status: string, title: string) => {
    try {
      const data = {status: status};
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CategoriesService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          setAlertMessage(`Status change to "${status}" for category: "${title}".`);
          fetchCategories(currentPage, itemsPerPage);
        } else {  
          setErrorMessage(`Error changing status to category: "${title}". Category not found.`);
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

  const handleDeleteCategory = (id: string, title: string) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return CategoriesService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          setAlertMessage(`Deleted category: ${title}.`);
          fetchCategories(currentPage, itemsPerPage);
        } else {  
          setErrorMessage(`Error deleting category: ${title}. Category not found.`);
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
    fetchCategories(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { categories, currentPage, totalPages, totalItems,
    itemsPerPage, loading, alertMessage, errorMessage, setCurrentPage,
    setItemsPerPage, handleNewCategorySaveClick, handleUpdateStatusCategory,
    handleDeleteCategory };
};

export default useCategories;