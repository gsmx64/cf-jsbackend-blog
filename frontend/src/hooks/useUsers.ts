import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { initIUserArray, IUserArray } from '../interfaces/user.interface';
import UsersService from '../services/users.service';


const useUsers = () => {
  const [users, setUsers] = useState<IUserArray>(initIUserArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchUsers = (currentPage: number, itemsPerPage: number) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return UsersService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        setUsers(response.data.data);
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

  const handleUpdateUserRole = (id: string, username: string, role: string) => {
    try {
      const data = {role: role};
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return UsersService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          setAlertMessage(`Role changed to ${role} to the user: "${username}"`);
          fetchUsers(currentPage, itemsPerPage);
        } else {  
          setErrorMessage(`Error changing role to user "${username}". User not found.`);
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

  const handleBanUser = (id: string, username: string, ban: boolean) => {
    try {
      const data = ban ? {status: 'BANNED'} : {status: 'ENABLED'};
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return UsersService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (ban && response.data.affected === 1) {
          setAlertMessage(`The user "${username}" was banned. Status: "${data.status}"`);
          fetchUsers(currentPage, itemsPerPage);
        } else if (!ban && response.data.affected === 1) {
          setAlertMessage(`The user "${username}" was unbanned. Status: "${data.status}"`);
          fetchUsers(currentPage, itemsPerPage);
        } else {  
          setErrorMessage(`Error changing ban status to user "${username}". User not found.`);
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

  const handleActivateUser = (id: string, username: string, activate: boolean) => {
    try {
      const data = activate ? {status: 'ENABLED'} : {status: 'PENDING'};
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return UsersService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1 && activate) {
          setAlertMessage(`The user "${username}" was activate. Status: "${data.status}".`);
          fetchUsers(currentPage, itemsPerPage);
        } else if (response.data.affected === 1 && !activate) {
          setAlertMessage(`The user "${username}" was deactivate. Status: "${data.status}".`);
          fetchUsers(currentPage, itemsPerPage);
        } else {  
          setErrorMessage(`Error changing activation status to user "${username}". User not found.`);
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

  const handleDeleteUser = (id: string, username: string) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return UsersService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          setAlertMessage(`Deleted user: "${username}".`);
          fetchUsers(currentPage, itemsPerPage);
        } else {  
          setErrorMessage(`Error deleting user: "${username}". User not found.`);
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
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { users, currentPage, totalPages, totalItems,
    itemsPerPage, loading, alertMessage, errorMessage, setCurrentPage,
    setItemsPerPage, handleUpdateUserRole, handleBanUser,
    handleActivateUser, handleDeleteUser};
};

export default useUsers;