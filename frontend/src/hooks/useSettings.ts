import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import SettingsService from "../services/settings.service";
import ISettings, { initISettings } from "../interfaces/settings.interface";

const useSettings = () => {
  const [settings, setSettings] = useState<ISettings>(initISettings);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchSettings = async () => {
    try {
      return await SettingsService
      .get()
      .then((response: AxiosResponse) => {
        setSettings(response.data);
      });
    } catch (error: any) {
      setSettings(initISettings);
    }
  }

  const handleEditSettingsSaveClick = (data: any) => {
    try {
      setAlertMessage('');
      setErrorMessage('');
      setLoading(true);

      return SettingsService
      .update(data)
      .then((response: AxiosResponse) => {      
        if(response.data) {
          setAlertMessage('Settings saved!');
        }
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

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, alertMessage, errorMessage, handleEditSettingsSaveClick };
};

export default useSettings;