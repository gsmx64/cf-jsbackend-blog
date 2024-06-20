import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import IUser, { IUserPassword, IUserRegister } from '../interfaces/user.interface';
import AuthService from '../services/auth.service';


const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<IUser | any | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchCurrentUser = async () => {
    try {
      const userStr = localStorage.getItem('user');
      return (userStr != null) ?
      await AuthService
      .getCurrentUser()
      .then((response: AxiosResponse) => {
        const userLocal = JSON.parse(userStr);
        const user = response.data;
        if (userLocal?.user?.id == user?.id) {
          setCurrentUser(response.data);
        } else {
          setCurrentUser(undefined);
        }
      })
      .catch(() => {
        setCurrentUser(undefined);
      }) : undefined;
    } catch (error) {
      setCurrentUser(undefined);
    }
  }

  const handleRegisterUserSaveClick = (body: IUserRegister) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return AuthService
      .register(body)
      .then((response: AxiosResponse) => {
        if(response.data.id !== undefined) {
          const { username, password } = body;
          AuthService
          .login(username, password)
          .then((response: AxiosResponse) => {
            if(
              (response.data.access_token !== undefined) &&
              (response.data.access_token !== '') &&
              (response.data.user.id !== undefined)
            ) {
              localStorage.setItem('user', JSON.stringify(response.data));
              setAlertMessage('Login successful!');
              fetchCurrentUser();
            } else {
              setErrorMessage('Error logging in user!');
            }
          })
          .catch((error: any) => {
            setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
          })
          .finally(() => {
            setLoading(false);
          });
        } else {
          setErrorMessage(`Error registering user. ${response.data.message}`);
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

  const handleLoginUserSaveClick = (username: string, password: string) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return AuthService
      .login(username, password)
      .then((response: AxiosResponse) => {
        if(
          (response.data.access_token !== undefined) &&
          (response.data.access_token !== '') &&
          (response.data.user.id !== undefined) &&
          (response.data.user.status === 'BANNED')
        ) {
          setErrorMessage('You was banned from this blog! You can not loggin!');
          setCurrentUser(undefined);
        } else if(
          (response.data.access_token !== undefined) &&
          (response.data.access_token !== '') &&
          (response.data.user.id !== undefined) &&
          (response.data.user.status === 'PENDING')
        ) {
          setErrorMessage('You must activate your account first! Check your email.');
          setCurrentUser(undefined);
        } else if(
          (response.data.access_token !== undefined) &&
          (response.data.access_token !== '') &&
          (response.data.user.id !== undefined) &&
          (response.data.user.status !== 'BANNED') &&
          (response.data.user.status !== 'PENDING')
        ) {
          localStorage.setItem('user', JSON.stringify(response.data));
          setAlertMessage('Login successful, redirecting to home page...');
          fetchCurrentUser();
        } else {
          setErrorMessage(`Error logging in user. ${response.data.message}`);
        }
      })
      .catch((error: any) => {
        setErrorMessage(JSON.stringify(error.response.data.error));
        if(
          (error.response.data.statusCode === 401) &&
          (error.response.data.error === 'Unauthorized')
        ) {
          setErrorMessage('Wrong username and/or password. Try again!');
        } else {
          setErrorMessage(JSON.stringify(error.response.data.error)+": "+JSON.stringify(error.response.data.message));
        }
      })
      .finally(() => {
        setLoading(false);
      });
    } catch (error: any) {
      setErrorMessage(error.toString());
    }
    return undefined;
  }

  const handleChangePasswordSaveClick = (data: IUserPassword) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);
      const userStr = localStorage.getItem('user');

      return (userStr != null) ? AuthService
      .changeOwnPassword(data)
      .then((response: AxiosResponse) => {
        if(response.data.affected === 1) {
          setAlertMessage('Password updated!');
          setTimeout(function(){
            AuthService.logout();
            setCurrentUser(undefined);
          }, 7000);
        } else {
          setErrorMessage(`Password not updated! ${response.data.message}`);
        }
      })
      .catch((error: any) => {
        setErrorMessage(JSON.stringify(error.response.data.message));
      })
      .finally(() => {
        setLoading(false);
      }) : setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.toString());
      setLoading(false);
    }
    return undefined;
  }

  const handleChangeAvatarSaveClick = (data: any) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);
      const userStr = localStorage.getItem('user');

      return (userStr != null) ? AuthService
      .changeOwnAvatar(data.avatar)
      .then((response: AxiosResponse) => {
        if(response.data.affected === 1) {
          setAlertMessage('Avatar updated!');
          setCurrentUser({
            ...currentUser,
            avatar: data.avatar,
          });
          fetchCurrentUser();
        } else {
          setErrorMessage(`Avatar not updated! ${response.data.message}`);
        }
      })
      .catch((error: any) => {
        setErrorMessage(JSON.stringify(error.response.data.message));
      })
      .finally(() => {
        setLoading(false);
      }) : setLoading(true);
    } catch (error: any) {
      setErrorMessage(error.toString());
      setLoading(false);
    }
    return undefined;
  }

  const handleLogOutClick = (event: any) => {
    event.stopPropagation();
    AuthService.logout();
    setCurrentUser(undefined);
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return { currentUser, loading, alertMessage, errorMessage,
    handleRegisterUserSaveClick, handleLoginUserSaveClick,
    handleChangePasswordSaveClick, handleChangeAvatarSaveClick,
    handleLogOutClick };
};

export default useCurrentUser;