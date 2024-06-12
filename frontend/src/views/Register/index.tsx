import RegisterForm from "../../components/RegisterForm";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCurrentUser from "../../hooks/useCurrentUser";
import useCurrentUserStore from "../../state/stores/currentUser";


const RegisterViewDefault = () => {
  const { loading, alertMessage, errorMessage, handleRegisterUserSaveClick } = useCurrentUser();
  return { loading, alertMessage, errorMessage, handleRegisterUserSaveClick };
}

const RegisterViewZustand= () => {
  const loading = useCurrentUserStore((state) => state.loading);
  const alertMessage = useCurrentUserStore((state) => state.alertMessage);
  const errorMessage = useCurrentUserStore((state) => state.errorMessage);
  const handleRegisterUserSaveClick = useCurrentUserStore((state) => state.handleRegisterUserSaveClick);

  return { loading, alertMessage, errorMessage, handleRegisterUserSaveClick }
}

const RegisterView = ({ settings }: any) => {
  const { loading, alertMessage, errorMessage, handleRegisterUserSaveClick } = (
    isZustandEnabled) ? RegisterViewZustand() : RegisterViewDefault();

  return (
    <>
      <div className="container">
        <RegisterForm
          isSetup={false}
          loading={loading}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          settings={settings}
          onRegisterUserSaveClick={handleRegisterUserSaveClick}
        />
      </div>
    </>
  );
}

export default RegisterView;