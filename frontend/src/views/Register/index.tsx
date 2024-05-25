import Navbar from "../../components/Navbar";
import RegisterForm from "../../components/RegisterForm";
import Footer from "../../components/Footer";


const RegisterView = () => {
  return (
    <>
      <Navbar
        onSearch={() => {}}
      />
      <div className="container">
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
}

export default RegisterView;