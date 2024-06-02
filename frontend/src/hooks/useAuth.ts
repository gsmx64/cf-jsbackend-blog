import { useState } from 'react';
import { AxiosResponse } from 'axios';

import AuthService from '../services/auth.service';
import { AuthBody } from '../interfaces/auth.interface';
import { IUserRegister } from '../interfaces/user.interface';


const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
              setAlertMessage('Login successful, redirecting to home page...');
            } else {
              setErrorMessage('Error logging in user.');
            }
          })
          .catch((error: any) => {
            setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response));
          })
          .finally(() => {
            setLoading(false);
          });
        } else {
          setErrorMessage('Error registering user.');
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

  const handleLoginUserSaveClick = (username: AuthBody, password: AuthBody) => {
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
          (response.data.user.id !== undefined)
        ) {
          setAlertMessage('Login successful, redirecting to home page...');
        } else {
          setErrorMessage('Error logging in user.');
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

  return { loading, alertMessage, errorMessage, handleRegisterUserSaveClick,
    handleLoginUserSaveClick };
};

export default useAuth;