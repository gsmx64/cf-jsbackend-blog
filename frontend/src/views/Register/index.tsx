import React, { useState } from "react";
//import { Formik, Field, Form, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
//import * as Yup from "yup";

//import IUser, { initIUser } from "../../interfaces/user.interface";
//import AuthService from "../../services/auth.service";
import AuthSignupForm from "../../components/AuthSignupForm";


const RegisterView = (): React.JSX.Element => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  /*const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        'len',
        'The username must be between 3 and 20 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 3 &&
        val.toString().length <= 20
      )
      .required('This field is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 6 &&
        val.toString().length <= 40
      )
      .required('This field is required!'),
  });

  const handleRegister = (formValue: IUser) => {
    //const { body } = formValue;

    AuthService.register(formValue).then(
      (response) => {
        setMessage(response.data.username); //data.message
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };*/

  //const message = ''; // test

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-3 col-md-6 offset-md-3">
          <AuthSignupForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterView;