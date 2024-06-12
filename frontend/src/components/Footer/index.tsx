import { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import CopyrightItem from "./components/CopyrightItem";
import SocialMediaLinksItem from "./components/SocialMediaLinksItem";


const Footer = ({ settings }: any) => { 
  const year = new Date().getFullYear();

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark rounded">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 ps-1">
          <SocialMediaLinksItem
            facebook={settings?.facebook}
            instagram={settings?.instagram}
            twitterx={settings?.twitterx}
            linkedin={settings?.linkedin}
            youtube={settings?.youtube}
            tiktok={settings?.tiktok}
          />
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 pe-2">
          <CopyrightItem
            year={year}
            brand={settings?.brand}
          />
        </div>
      </nav>
    </div>
  );
};

export default memo(Footer);