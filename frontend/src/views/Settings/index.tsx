import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PanelSettingsForm from "../../components/PanelSettingsForm";
import SettingsService from "../../services/settings.service";
import ISettings, { initISettings } from "../../interfaces/settings.interface";


const SettingsView = () => {
  const [settings, setSettings] = useState<ISettings>(initISettings);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSettings();
  }, []);
  
  const fetchSettings = () => {
    setErrorMessage('');
    setLoading(true);

    return SettingsService
    .get()
    .then((response: AxiosResponse) => {
      setSettings(response.data);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleSettingsCancelClick = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar
        onSearch={() => {}}
      />
      <div className="container">
        <PanelSettingsForm
          brand={settings?.brand}
          facebook={settings?.facebook}
          instagram={settings?.instagram}
          twitterx={settings?.twitterx}
          linkedin={settings?.linkedin}
          youtube={settings?.youtube}
          tiktok={settings?.tiktok}
          error={errorMessage}
          loading={loading}
          onSettingsCancelClick={handleSettingsCancelClick}
        />
      </div>
      <Footer />
    </>
  )
}

export default SettingsView;