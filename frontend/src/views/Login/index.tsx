import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";


const LoginView = () => {
  return (
    <>
      <Navbar
        onSearch={() => {}}
      />
      <div className="container">
        <LoginForm />
      </div>
      <Footer />
    </>
  );
}

export default LoginView;