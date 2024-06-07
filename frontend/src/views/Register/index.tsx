import RegisterForm from "../../components/RegisterForm";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
import useAuthStore from "../../state/stores/auth";
import useSettingsStore from "../../state/stores/settings";


const RegisterViewDefault = () => {
  const { settings } = useSettings();
  const { loading, alertMessage, errorMessage, handleRegisterUserSaveClick } = useAuth();
  return { settings, loading, alertMessage, errorMessage, handleRegisterUserSaveClick };
}

const RegisterViewZustand= () => {
  const settings = useSettingsStore((state) => state.settings);
  const loading = useAuthStore((state) => state.loading);
  const alertMessage = useAuthStore((state) => state.alertMessage);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const handleRegisterUserSaveClick = useAuthStore((state) => state.handleRegisterUserSaveClick);

  return { settings, loading, alertMessage, errorMessage, handleRegisterUserSaveClick }
}

const RegisterView = () => {
  const { settings, loading, alertMessage, errorMessage, handleRegisterUserSaveClick } = (
    isZustandEnabled) ? RegisterViewZustand() : RegisterViewDefault();

  return (
    <>
      <div className="container">
        <RegisterForm
          settings={settings}
          isSetup={false}
          loading={loading}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          onRegisterUserSaveClick={handleRegisterUserSaveClick}
        />
      </div>
    </>
  );
}

export default RegisterView;