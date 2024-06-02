import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import validationSchema from "./utils/validationSchema";
import { initICommentCreate } from "../../interfaces/comment.interface";
import Alerts from "../Alerts";


const CommentForm = ({ postId, loading, alertMessage, errorMessage, onNewCommentSaveClick }: any) => {
  const navigate = useNavigate();

  const [showNewComment, setShowNewComment] = useState(false);
  const handleNewCommentClose = () => {
    setShowNewComment(false);
    reset();
  }
  const handleNewCommentShow = () => setShowNewComment(true);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      defaultValues: initICommentCreate,
    }
  );

  const onSubmitHandler = (body: any) => {
    const saveSuccessful = onNewCommentSaveClick(postId, body);
    if (saveSuccessful !== undefined) {
      navigate(`/post/${postId}`, { state: postId });
      handleNewCommentClose();
    }
  }

  return (
    <div className="row align-items-end">
      <div className="col">
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            className="needs-validation"
          >
          <div className="text-secondary float-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={handleNewCommentShow}
            >
              Publish a new comment
            </button>
          </div>
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            style={{ display: 'block', position: 'initial' }}
          >
            <Modal show={showNewComment} onHide={handleNewCommentClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Publish a new comment:</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  id={`post-comment-textarea`}
                  placeholder="Post a message here..."
                  autoComplete="off"
                  className={`${(
                    (isSubmitted && errors?.message) ?
                    "form-control is-invalid text-center" :
                    (isSubmitted && errors?.message === undefined) ?
                    "form-control is-valid text-center" :
                    "form-control text-center"
                  )}`}
                  {...register('message')}
                  rows={5}
                />
                {errors.message && <div className="invalid-feedback">{(errors.message.message?.toString())}</div>}
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
                  onClick={handleNewCommentClose}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <Alerts
            alertMessage={alertMessage}
            errorMessage={errorMessage}
          />
        </form>
      </div>
    </div>
  );
}

export default CommentForm;