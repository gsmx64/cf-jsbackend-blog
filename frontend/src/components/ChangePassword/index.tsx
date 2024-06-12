import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../../services/auth.service";
import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";
import { IUserPassword } from "../../interfaces/user.interface";


const ChangePassword = ({ loading, alertMessage, errorMessage, onChangePasswordSaveClick }: any) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const handleChangePasswordClose = () => {
    setShowChangePassword(false);
    reset();
  }
  const handleChangePasswordShow = () => setShowChangePassword(true);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
    }
  );

  const onSubmitHandler = (body: IUserPassword) => {
    onChangePasswordSaveClick(body);
  }

  const changePasswordFormResult = (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      className="needs-validation"
    >
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={handleChangePasswordShow}
      >
        <i className="bi bi-key-fill"></i>
        <span>Change password</span>
      </button>
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal show={showChangePassword} onHide={handleChangePasswordClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Change your password:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="mb-3">
              <label htmlFor="current_password" className="form-label">
                Current password:
              </label>
              <input
                type="password"
                id="current_password"
                placeholder="Insert your curret password..."
                className={`${(
                  (isSubmitted && errors?.current_password) ?
                  "form-control is-invalid" :
                  (isSubmitted && errors?.current_password === undefined) ?
                  "form-control is-valid" :
                  "form-control"
                )}`}
                {...register('current_password')}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Insert your new password..."
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
                Repeat the new password:
              </label>
              <input
                type="password"
                id="repeat_password"
                placeholder="Repeat your new password..."
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
            <Alerts
              alertMessage={alertMessage}
              errorMessage={errorMessage}
            />
          </Modal.Body>
          <Modal.Footer>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <Button
              variant="primary"
              onClick={handleSubmit(onSubmitHandler)}
              disabled={loading}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={handleChangePasswordClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </form>
  );

  return (AuthService.isLoggedIn()) ? changePasswordFormResult : '';

}

export default ChangePassword;