import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import CategoriesService from "../../services/categories.service";
import validationSchema from "./utils/validationSchema";

import { initICategoryCreate } from "../../interfaces/category.interface";
import Alerts from "../Alerts";


const PanelNewCategoryForm = ({ onNewCategoryCancelClick }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      defaultValues: initICategoryCreate,
    }
  );

  const navigate: NavigateFunction = useNavigate();

  const handleNewCategoryCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onNewCategoryCancelClick();
  };

  const onSubmitHandler = (data: any) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return CategoriesService
    .create({
      ...data,
      status: 'UNPUBLISHED',
      posts: []
    })
    .then((response: AxiosResponse) => {
      setLoading(false);        
      if(response.data) {
        setAlertMessage(`Category ${response.data.title} created!`);
        navigate(`/list-categories`);
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
    <div className="card mb-3">
      <div className="card-body">
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            className="needs-validation"
          >
          <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">New category</i></h6>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Title</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="title"
                placeholder="Category title"
                className={`${(
                  (isSubmitted && errors?.title) ?
                  "form-control is-invalid text-center" :
                  (isSubmitted && errors?.title === undefined) ?
                  "form-control is-valid text-center" :
                  "form-control text-center"
                )}`}
                {...register('title')}
              />
              {errors.title && <div className="invalid-feedback">{(errors.title.message?.toString())}</div>}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Description</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="description"
                placeholder="Category description"
                className={`${(
                  (isSubmitted && errors?.description) ?
                  "form-control is-invalid text-center" :
                  (isSubmitted && errors?.description === undefined) ?
                  "form-control is-valid text-center" :
                  "form-control text-center"
                )}`}
                {...register('description')}
              />
              {errors.description && <div className="invalid-feedback">{(errors.description.message?.toString())}</div>}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Image</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="image"
                placeholder="Category image"
                autoComplete="off"
                className={`${(
                  (isSubmitted && errors?.image) ?
                  "form-control is-invalid text-center" :
                  (isSubmitted && errors?.image === undefined) ?
                  "form-control is-valid text-center" :
                  "form-control text-center"
                )}`}
                {...register('image')}
              />
              {errors.image && <div className="invalid-feedback">{(errors.image.message?.toString())}</div>}
            </div>
          </div>
          <hr />
          <div className="mb-3">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Save</span>
            </button>
            <button type="submit" onClick={handleNewCategoryCancelClick} className="btn btn-primary btn-block ms-2" disabled={loading}>
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

export default PanelNewCategoryForm;