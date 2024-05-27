import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import CopyrightItem from "./components/CopyrightItem";
import SocialMediaLinksItem from "./components/SocialMediaLinksItem";
import ISettings, { initISettings } from "../../interfaces/settings.interface";
import SettingsService from "../../services/settings.service";
import useSettingsStore from "../../state/stores/settings";
import { isZustandEnabled } from "../../constants/defaultConstants";


const FooterDefault = () => {
  const [settings, setSettings] = useState<ISettings>(initISettings);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = () => {
    return SettingsService
    .get()
    .then((response: AxiosResponse) => {
      setSettings(response.data);
    });
  }

  return { settings }
}

const FooterZustand= () => {
  const settings = useSettingsStore((state) => state.settings);
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings }
}

const Footer = () => { 
  const { settings } = (isZustandEnabled) ? FooterZustand() : FooterDefault();
  const year = new Date().getFullYear();

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark rounded">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 ps-1">
          <SocialMediaLinksItem
            facebook={settings.facebook}
            instagram={settings.instagram}
            twitterx={settings.twitterx}
            linkedin={settings.linkedin}
            youtube={settings.youtube}
            tiktok={settings.tiktok}
          />
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 pe-2">
          <CopyrightItem
            year={year}
            brand={settings.brand}
          />
        </div>
      </nav>
    </div>
  );
};

export default Footer;