import LoginForm from "../../components/LoginForm";


const LoginView = ({ currentUser, loading, alertMessage, errorMessage, handleLoginUserSaveClick }: any) => {
  
  return (
    <>
      <div className="container">
        <LoginForm
          currentUser={currentUser}
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