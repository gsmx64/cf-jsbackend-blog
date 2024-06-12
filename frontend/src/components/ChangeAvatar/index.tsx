import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../../services/auth.service";
import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";


const ChangeAvatar = ({ loading, alertMessage, errorMessage, onChangeAvatarSaveClick }: any) => {
  const [showChangeAvatar, setShowChangeAvatar] = useState(false);
  const handleChangeAvatarClose = () => {
    setShowChangeAvatar(false);
    reset();
  }
  const handleChangeAvatarShow = () => setShowChangeAvatar(true);
  
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

  const onSubmitHandler = (body: any) => {
    onChangeAvatarSaveClick(body);
  }

  const changeAvatarFormResult = (
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
        onClick={handleChangeAvatarShow}
      >
        <i className="bi bi-person-circle"></i>
        <span>Change avatar</span>
      </button>
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal show={showChangeAvatar} onHide={handleChangeAvatarClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Change your avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              {errors.avatar && <div className="invalid-feedback">{errors.avatar.message}</div>}
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
              onClick={handleChangeAvatarClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </form>
  );

  return (AuthService.isLoggedIn()) ? changeAvatarFormResult : '';

}

export default ChangeAvatar;