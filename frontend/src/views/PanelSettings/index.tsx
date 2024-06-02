import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PanelSettingsForm from "../../components/PanelSettingsForm";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useSettings from "../../hooks/useSettings";
import useSettingsStore from "../../state/stores/settings";


const PanelSettingsViewDefault = () => {
  return useSettings();
}

const PanelSettingsViewZustand= () => {
  const settings = useSettingsStore((state) => state.settings);
  const loading = useSettingsStore((state) => state.loading);
  const alertMessage = useSettingsStore((state) => state.alertMessage);
  const errorMessage = useSettingsStore((state) => state.errorMessage);
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);
  const handleEditSettingsSaveClick = useSettingsStore((state) => state.handleEditSettingsSaveClick);

  useEffect(() => {
    fetchSettings(true);
  }, []);

  return { settings, loading, alertMessage, errorMessage,
    handleEditSettingsSaveClick
  }
}

const PanelSettingsView = () => {
  const { settings, loading, alertMessage, errorMessage,
    handleEditSettingsSaveClick } = (
      isZustandEnabled) ? PanelSettingsViewZustand() : PanelSettingsViewDefault();
  const navigate = useNavigate();

  const handleSettingsCancelClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="container">
        <PanelSettingsForm
          brand={settings?.brand}
          terms={settings?.terms}
          facebook={settings?.facebook}
          instagram={settings?.instagram}
          twitterx={settings?.twitterx}
          linkedin={settings?.linkedin}
          youtube={settings?.youtube}
          tiktok={settings?.tiktok}
          loading={loading}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          onEditSettingsSaveClick={handleEditSettingsSaveClick}
          onEditSettingsCancelClick={handleSettingsCancelClick}
        />
      </div>
    </>
  )
}

export default PanelSettingsView;