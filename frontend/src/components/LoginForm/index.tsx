import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthBody, initIAuth } from "../../interfaces/auth.interface";
import styles from "./Login.module.css";
import validationSchema from "./utils/validationSchema";
import { DEFAULT_NO_AVATAR_MEDIUM } from "../../constants/defaultConstants";
import Alerts from "../Alerts";


const LoginForm = ({ currentUser, loading, alertMessage, errorMessage, onLoginUserSaveClick }: any) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm( { 
    resolver: yupResolver(validationSchema),
    defaultValues: initIAuth,
  } );

  const onSubmitHandler = (body: AuthBody) => {
    const { username, password } = body;
    onLoginUserSaveClick(username, password);
  }

  return (
    (currentUser === undefined) ? (
    <div className="container">
      <div className="row">
        <div className="offset-md-3 col-md-6 offset-md-3">
          <div className={styles.cardContainer}>
            <img
              src={DEFAULT_NO_AVATAR_MEDIUM}
              alt="profile-img"
              className={styles.cardContainerImage}
            />
            <form onSubmit={handleSubmit(onSubmitHandler)} className="px-4 py-3">
              <div className="form-group mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Insert your username..."
                  className={`${(
                    (isSubmitted && errors?.username) ?
                    "form-control is-invalid" :
                    (isSubmitted && errors?.username === undefined) ?
                    "form-control is-valid" :
                    "form-control"
                  )}`}
                  {...register('username')}
                />
                {errors.username && <div className="invalid-feedback">{String(errors.username.message)}</div>}
              </div>
  
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Insert your password..."
                  className={`${(
                    (isSubmitted && errors?.password) ?
                    "form-control is-invalid" :
                    (isSubmitted && errors?.password === undefined) ?
                    "form-control is-valid" :
                    "form-control"
                  )}`}
                  {...register('password')}
                />
                {errors.password && <div className="invalid-feedback">{String(errors.password.message)}</div>}
              </div>
  
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
              <Alerts
                alertMessage={alertMessage}
                errorMessage={errorMessage}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    ) : (
      <>
        <Navigate to="/" replace />
      </>
    )
  );
}

export default LoginForm;