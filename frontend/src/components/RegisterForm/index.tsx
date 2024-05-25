import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthService from "../../services/auth.service";
import ValidationSchema from "./utils/validationSchema";
import { IUserRegister, initIUserRegister } from "../../interfaces/user.interface";
import Alerts from "../Alerts";


const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm( { 
    resolver: yupResolver(ValidationSchema),
    defaultValues: initIUserRegister,
  } );

  const navigate: NavigateFunction = useNavigate();

  const onSubmitHandler = (body: IUserRegister) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    AuthService
    .register(body)
    .then(() => {
      const { username, password } = body;
      AuthService
      .login(username, password)
      .then(() => {
        setAlertMessage('Register successful, making auto-login and redirecting to home page...');
        setLoading(false);
        navigate('/');
      })
      .catch((error: any) => {
        setLoading(false);
        setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
      })
      .finally(() => {
        setLoading(false);
      });
    })
    .catch((error: any) => {
      setLoading(false);
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="row d-flex justify-content-center needs-validation">
      <div className="col-md-4">
        <h1>Register form</h1>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          className="needs-validation"
        >

          <div className="mb-3">
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
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          <div className="mb-3">
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
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="repeat_password" className="form-label">
              Repeat Password:
            </label>
            <input
              type="password"
              id="repeat_password"
              placeholder="Repeat your password..."
              className={`${(
                (isSubmitted && errors?.repeat_password) ?
                "form-control is-invalid" :
                (isSubmitted && errors?.repeat_password === undefined) ?
                "form-control is-valid" :
                "form-control"
              )}`}
              {...register('repeat_password')}
            />
            {errors.repeat_password && <div className="invalid-feedback">{errors.repeat_password.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar:
            </label>
            <input
              type="text"
              id="avatar"
              placeholder="Insert direct url link or leave empty for default."
              className={`${(
                (isSubmitted && errors?.avatar) ?
                "form-control is-invalid" :
                (isSubmitted && errors?.avatar === undefined) ?
                "form-control is-valid" :
                "form-control"
              )}`}
              {...register('avatar')}
            />
            {errors.avatar && <span className="invalid-feedback">{errors.avatar.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Insert your firstName..."
              className={`${(
                (isSubmitted && errors?.firstName) ?
                "form-control is-invalid" :
                (isSubmitted && errors?.firstName === undefined) ?
                "form-control is-valid" :
                "form-control"
              )}`}
              {...register('firstName')}
            />
            {errors.firstName && <span className="invalid-feedback">{errors.firstName.message}</span>}
            
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Surname:
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Insert your lastName..."
              className={`${(
                (isSubmitted && errors?.lastName) ?
                "form-control is-invalid" :
                (isSubmitted && errors?.lastName === undefined) ?
                "form-control is-valid" :
                "form-control"
              )}`}
              {...register('lastName')}
            />
            {errors.lastName && <span className="invalid-feedback">{errors.lastName.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              placeholder="Insert your email..."
              className={`${(
                (isSubmitted && errors?.email) ?
                "form-control is-invalid" :
                (isSubmitted && errors?.email === undefined) ?
                "form-control is-valid" :
                "form-control"
              )}`}
              {...register('email')}
            />
            {errors.email && <span className="invalid-feedback">{errors.email.message}</span>}            
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="text"
              id="age"
              placeholder="Insert your age..."
              className={`${(
                (isSubmitted && errors?.age) ?
                "form-control is-invalid" :
                (isSubmitted && errors?.age === undefined) ?
                "form-control is-valid" :
                "form-control"
              )}`}
              {...register('age')}
            />
            {errors.age && <span className="invalid-feedback">{errors.age.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City:
            </label>
            <input
              type="text"
              id="city"
              placeholder="Insert your city..."
              className={`${(
                (isSubmitted && errors?.city) ?
                "form-control is-invalid" :
                (isSubmitted && errors?.city === undefined) ?
                "form-control is-valid" :
                "form-control"
              )}`}
              {...register('city')}
            />
            {errors.city && <span className="invalid-feedback">{errors.city.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              id="country"
              placeholder="Insert your country..."
              className={`${(
                (isSubmitted && errors?.country) ?
                "form-control is-invalid" :
                (isSubmitted && errors?.country === undefined) ?
                "form-control is-valid" :
                "form-control"
              )}`}
              {...register('country')}
            />
            {errors.country && <span className="invalid-feedback">{errors.country.message}</span>}
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Register</span>
            </button>
          </div>
          <Alerts
            alertMessage={alertMessage}
            errorMessage={errorMessage}
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;