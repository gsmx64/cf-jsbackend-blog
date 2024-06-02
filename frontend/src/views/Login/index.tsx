import LoginForm from "../../components/LoginForm";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useAuth from "../../hooks/useAuth";
import useAuthStore from "../../state/stores/auth";


const LoginViewDefault = () => {
  return useAuth()
}

const LoginViewZustand= () => {
  const loading = useAuthStore((state) => state.loading);
  const alertMessage = useAuthStore((state) => state.alertMessage);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const handleLoginUserSaveClick = useAuthStore((state) => state.handleLoginUserSaveClick);

  return { loading, alertMessage, errorMessage, handleLoginUserSaveClick }
}

const LoginView = () => {
  const { loading, alertMessage, errorMessage, handleLoginUserSaveClick } = (
    isZustandEnabled) ? LoginViewZustand() : LoginViewDefault();
  
  return (
    <>
      <div className="container">
        <LoginForm
          loading={loading}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          onLoginUserSaveClick={handleLoginUserSaveClick}
        />
      </div>
    </>
  );
}

export default LoginView;