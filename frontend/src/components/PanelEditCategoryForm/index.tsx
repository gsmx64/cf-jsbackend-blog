import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";
import ICategory from "../../interfaces/category.interface";
import IUser from "../../interfaces/user.interface";
import ISettings from "../../interfaces/settings.interface";


interface PanelEditCategoryViewProps {
  categoryId: string | undefined;
  category: ICategory;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | string | unknown;
  currentUser: IUser | undefined;
  settings: ISettings;
  onEditCategorySaveClick: (id: string | undefined, data: any) => void | undefined;
  onEditCategoryCancelClick: () => void;
}

const PanelEditCategoryForm = ({ categoryId, category, loading, alertMessage, errorMessage,
  onEditCategorySaveClick, onEditCategoryCancelClick }: PanelEditCategoryViewProps) => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      values: {
        title: category.title,
        description: category.description,
        image: category.image,
        status: category.status,
      }
    }
  );

  const onSubmitHandler = (body: any) => {
    const saveSuccessful = onEditCategorySaveClick(categoryId, body);
    if (
      (saveSuccessful !== undefined) &&
      (errorMessage == '')
    ) {
      navigate(`/list-categories`);
    }
  }

  const handleEditCategoryCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onEditCategoryCancelClick();
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
              Edit category
            </i>
          </h6>
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
              {
                errors.title &&
                <div className="invalid-feedback">
                  {(errors.title.message?.toString())}
                </div>
              }
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
              {
                errors.description &&
                <div className="invalid-feedback">
                  {(errors.description.message?.toString())}
                </div>
              }
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
              {
                errors.image &&
                <div className="invalid-feedback">
                  {(errors.image.message?.toString())}
                </div>
              }
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Status</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <select
                id={`post-select-status`}
                className="form-select form-select-sm pe-14"
                style={{minWidth:124 }}
                {...register('status')}
              >
                <option disabled value=""> - Select Status - </option>
                <option value="PUBLISHED">Published</option>
                <option value="UNPUBLISHED">Unpublished</option>
                <option value="ARCHIVED">Archived</option>
                <option value="TRASHED">Trashed</option>
              </select>
              {errors.status && <div className="invalid-feedback">{(errors.status.message?.toString())}</div>}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Created</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <span>
                {category.createAt}
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
                {category.updateAt}
              </span>
            </div>
          </div>
          <hr />
          <div className="mb-3">
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
              onClick={handleEditCategoryCancelClick}
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

export default PanelEditCategoryForm;