import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import IUser from '../interfaces/user.interface';
import AuthService from '../services/auth.service';


const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      return await AuthService
      .getCurrentUser()
      .then((response: AxiosResponse) => {
        if(response.data) {
          setCurrentUser(response.data);
        } else {
          setCurrentUser(undefined);
        }
      })
      .catch(() => {
        setCurrentUser(undefined);
        setLoading(false)
      });
    } catch (error) {
      setCurrentUser(undefined);
      setLoading(false)
    }
  }

  const handleLogOutClick = (event: any) => {
    event.stopPropagation();
    AuthService.logout();
    setCurrentUser(undefined);
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return { currentUser, loading, handleLogOutClick };
};

export default useCurrentUser;