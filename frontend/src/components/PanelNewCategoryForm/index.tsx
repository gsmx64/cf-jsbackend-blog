import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";


const PanelNewCategoryForm = ({ loading, alertMessage, errorMessage,
  onNewCategorySaveClick, onNewCategoryCancelClick, isSetup }: any) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema)
    }
  );

  const onSubmitHandler = (body: any) => {
    onNewCategorySaveClick(body);
  }

  const handleNewCategoryCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onNewCategoryCancelClick();
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
              New category
            </i>
          </h6>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">Title</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="title"
                placeholder="Category title"
                className={`${(
                  (isSubmitted && errors?.title) ?
                  "form-control is-invalid" :
                  (isSubmitted && errors?.title === undefined) ?
                  "form-control is-valid" :
                  "form-control"
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
              <h6 className="text-center mb-0">Description</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <textarea
                id={`category-description-textarea`}
                placeholder="Category description"
                autoComplete="off"
                className={`${(
                  (isSubmitted && errors?.description) ?
                  "form-control is-invalid" :
                  (isSubmitted && errors?.description === undefined) ?
                  "form-control is-valid" :
                  "form-control"
                )}`}
                {...register('description')}
                rows={5}
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
              <h6 className="text-center mb-0">Image</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="image"
                placeholder="Category image"
                autoComplete="off"
                className={`${(
                  (isSubmitted && errors?.image) ?
                  "form-control is-invalid" :
                  (isSubmitted && errors?.image === undefined) ?
                  "form-control is-valid" :
                  "form-control"
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
          <div className="text-center mb-3">
            <button
              type="submit"
              className={(isSetup && alertMessage && !errorMessage) ? "btn btn-secondary btn-block" : "btn btn-primary btn-block"}
              disabled={(isSetup && alertMessage && !errorMessage) ? true : loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Save</span>
            </button>
            { !isSetup &&
              <button
                type="submit"
                onClick={handleNewCategoryCancelClick}
                className="btn btn-primary btn-block ms-2"
                disabled={loading}
              >
                <span>Close</span>
              </button>
            }
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