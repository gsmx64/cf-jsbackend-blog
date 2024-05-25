import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AxiosResponse } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import CommentsService from "../../services/comments.service";
import validationSchema from "./utils/validationSchema";
import { initICommentCreate } from "../../interfaces/comment.interface";
import Alerts from "../Alerts";


const CommentForm = ({ postId }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    //reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      defaultValues: initICommentCreate,
    }
  );

  const navigate: NavigateFunction = useNavigate();

  const handleCommentEditCancelClick = (/*event: any*/) => {
    //event.stopPropagation();
    //reset();
    //onCommentEditCancelClick();
  };

  const onSubmitHandler = (data: any) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return CommentsService
      .create({
        ...data,
        post: postId,
      })
      .then((response: AxiosResponse) => {
        setLoading(false);        
        if(response.data) {
          setAlertMessage('Comment created!');
          navigate(`/post/${response.data.post}`);
        }
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
    <div className="row align-items-end mt-5">
      <div className="col">
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            className="needs-validation"
          >
          <div className="text-secondary float-end">
            <h6>Publish a new comment:</h6>
          </div>
          <div className="comment text-secondary">
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
            ></textarea>
            {errors.message && <div className="invalid-feedback">{(errors.message.message?.toString())}</div>}
          </div>
          <div className="mb-3 mt-2">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Save</span>
            </button>
            <button type="submit" onClick={handleCommentEditCancelClick} className="btn btn-primary btn-block ms-2" disabled={loading}>
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

export default CommentForm;