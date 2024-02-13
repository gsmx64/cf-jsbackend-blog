import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";

import AuthService from "../../services/auth.service";
import { AuthBody, initIAuth } from "../../interfaces/auth.interface";
import styles from "./Login.module.css";


const LoginView = (): React.JSX.Element => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const handleLogin = (formValue: { username: AuthBody; password: AuthBody }) => {
    const { username, password } = formValue;

    setMessage('');
    setLoading(true);

    AuthService.login(username, password).then(
      () => {
        navigate('/');
        window.location.reload();
      },
      (error: any) => {
        const resMessage = (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-3 col-md-6 offset-md-3">
          <div className={styles.cardContainer}>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className={styles.cardContainerImage}
            />
            <Formik
              initialValues={initIAuth}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form className="px-4 py-3">
                <div className="form-group mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;