import { useEffect, useRef, useState } from "react";
import { useTheme } from "react-hook-theme";

import MyRoutes from "./routes";
import { isZustandEnabled } from "./constants/defaultConstants";
import useCurrentUser from "./hooks/useCurrentUser";
import useSettings from "./hooks/useSettings";
import useCurrentUserStore from "./state/stores/currentUser";
import useSettingsStore from "./state/stores/settings";
import { IProps } from "./interfaces/router.interface";
import "./App.css";


export const AppDefault = () => {
  return {...useCurrentUser(), ...useSettings()};
}

export const AppZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const loading = useCurrentUserStore((state) => state.loading);
  const alertMessage = useCurrentUserStore((state) => state.alertMessage);
  const errorMessage = useCurrentUserStore((state) => state.errorMessage);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);
  const handleRegisterUserSaveClick = useCurrentUserStore((state) => state.handleRegisterUserSaveClick);
  const handleLoginUserSaveClick = useCurrentUserStore((state) => state.handleLoginUserSaveClick);
  const handleChangePasswordSaveClick = useCurrentUserStore((state) => state.handleChangePasswordSaveClick);
  const handleChangeAvatarSaveClick = useCurrentUserStore((state) => state.handleChangeAvatarSaveClick);
  const handleLogOutClick = useCurrentUserStore((state) => state.handleLogOutClick);

  const settings = useSettingsStore((state) => state.settings);
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);

  useEffect(() => {
    fetchCurrentUser();
    fetchSettings(false);
  }, []);

  return { currentUser, loading, alertMessage, errorMessage, settings,
    handleRegisterUserSaveClick, handleLoginUserSaveClick,
    handleChangePasswordSaveClick, handleChangeAvatarSaveClick, handleLogOutClick }
}

function App() {
  const { currentUser, loading, alertMessage, errorMessage, settings,
    handleRegisterUserSaveClick, handleLoginUserSaveClick, handleChangePasswordSaveClick,
    handleChangeAvatarSaveClick, handleLogOutClick } = (isZustandEnabled) ? AppZustand() : AppDefault();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef<HTMLInputElement>();
  const { theme, } = useTheme();

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term.toLowerCase());
  }

  const props: IProps = { currentUser, loading, alertMessage, errorMessage, settings,
    searchTerm, setSearchTerm, handleNavbarSearch, handleRegisterUserSaveClick,
    handleLoginUserSaveClick, handleChangePasswordSaveClick, 
    handleChangeAvatarSaveClick, handleLogOutClick, containerRef }

  return (
    <div data-bs-theme={theme}>
      {MyRoutes(props)}
    </div>
  )
}

export default App;