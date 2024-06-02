import { memo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import CopyrightItem from "./components/CopyrightItem";
import SocialMediaLinksItem from "./components/SocialMediaLinksItem";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useSettings from "../../hooks/useSettings";
import useSettingsStore from "../../state/stores/settings";


const FooterDefault = () => {
  return useSettings()
}

const FooterZustand= () => {
  const settings = useSettingsStore((state) => state.settings);
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);

  useEffect(() => {
    fetchSettings(false);
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

export default memo(Footer);