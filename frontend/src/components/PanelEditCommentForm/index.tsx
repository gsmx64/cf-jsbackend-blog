import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";
import IComment from "../../interfaces/comment.interface";


interface PanelEditCommentFormProps {
  commentId: string | undefined;
  comment: IComment;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | string | unknown;
  userRole: string | undefined | null;
  onEditCommentSaveClick: (id: string | undefined, data: any) => void;
  onEditCommentCancelClick: () => void;
}

const PanelEditCommentForm = ({ commentId, comment, loading, alertMessage, errorMessage,
  onEditCommentSaveClick, onEditCommentCancelClick }: PanelEditCommentFormProps) => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      values: { message: comment.message }
    }
  );

  const onSubmitHandler = (body: any) => {
    const saveSuccessful = onEditCommentSaveClick(commentId, body);
    if (
      (saveSuccessful !== undefined) &&
      (errorMessage == '')
    ) {
      navigate(`/list-comments`);
    }
  }

  const handleEditCommentCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onEditCommentCancelClick();
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            className="needs-validation"
          >
          <h6 className="d-flex align-items-center mb-3">
            <i className="material-icons text-info mr-2 pe-1">
              Edit comment
            </i>
          </h6>
            
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Comment</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <textarea
                id="message"
                placeholder="Insert the comment"
                className={`${(
                  (isSubmitted && errors?.message) ?
                  "form-control is-invalid" :
                  (isSubmitted && errors?.message === undefined) ?
                  "form-control is-valid" :
                  "form-control"
                )}`}
                {...register('message')}
              />
              {
                errors.message &&
                <div className="invalid-feedback">
                  {(errors.message.message?.toString())}
                </div>
              }
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Created</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <span>
                {comment.createAt}
              </span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Last update</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <span>
                {comment.updateAt}
              </span>
            </div>
          </div>
          <hr />
          <div className="mb-3 mt-2">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Save</span>
            </button>
            <button
              type="submit"
              onClick={handleEditCommentCancelClick}
              className="btn btn-primary btn-block ms-2"
              disabled={loading}
            >
              <span>Cancel</span>
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
}

export default PanelEditCommentForm;