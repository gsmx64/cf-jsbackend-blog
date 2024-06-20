import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";
import Loading from "../Loading";
import Editor from "../Editor";


const PanelNewPostForm = ({ categories, loading, alertMessage,
  errorMessage, onNewPostSaveClick, onNewPostCancelClick }: any) => {
  const activeCategories = Array.from(categories);
  const [postContent, setPostContent] = useState<string>('');

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
    onNewPostSaveClick(body);
  };

	const handleWYSIWYGChange = useCallback((postContent: string) => {
		setPostContent(postContent);
		return (postContent: string) => setPostContent(postContent);
	}, []);

  const handleNewPostCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onNewPostCancelClick();
  };

  return (
    <>
      {activeCategories && loading ? (
        <Loading />
      ) : (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <form
                id="NewPostForm"
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                className="needs-validation"
              >
                <h6 className="d-flex align-items-center mb-3">
                  <i className="material-icons text-info pe-1">New post</i>
                </h6>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="text-center mb-0">Title</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      id="title"
                      placeholder="Post title"
                      className={`${(
                        (isSubmitted && errors?.title) ?
                        "form-control is-invalid" :
                        (isSubmitted && errors?.title === undefined) ?
                        "form-control is-valid" :
                        "form-control"
                      )}`}
                      {...register('title')}
                    />
                    {errors.title && <div className="invalid-feedback">{(errors.title.message?.toString())}</div>}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="text-center mb-0">Description</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <textarea
                      id={`post-description-textarea`}
                      placeholder="Post description"
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
                    {errors.description && <div className="invalid-feedback">{(errors.description.message?.toString())}</div>}
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
                      placeholder="Post image"
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
                    {errors.image && <div className="invalid-feedback">{(errors.image.message?.toString())}</div>}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="text-center mb-0">Content</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <div
                      className={`${(
                        (isSubmitted && errors?.content) ?
                        "form-control is-invalid" :
                        (isSubmitted && errors?.content === undefined) ?
                        "form-control is-valid" :
                        "form-control"
                      )}`}
                    >
                      <Editor
                        defaultValue={postContent}
                        toolbarMode={'full'}
                        placeholder="Post content"
                        handleWYSIWYGChange={handleWYSIWYGChange}
                      />
                    </div>
                    <textarea
                      id={`post-content-textarea`}
                      placeholder="Post content"
                      autoComplete="off"
                      value={postContent}
                      style={{display: 'none'}}
                      {...register('content')}
                      rows={10}
                    />
                    {errors.content && <div className="invalid-feedback">{(errors.content.message?.toString())}</div>}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="text-center mb-0">Category</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <select
                      id={`post-select-category`}
                      className="form-select form-select-sm pe-14" style={{minWidth:124 }}
                      defaultValue=""
                      {...register('category')}
                    >
                      <option disabled value=""> - Select Category - </option>
                      {
                        activeCategories?.map((categoryItem: any, idx: number) => (
                          (categoryItem.status === 'PUBLISHED') &&
                            <option
                              key={idx}
                              value={categoryItem.id}
                            >
                              {categoryItem.title}
                            </option>
                        ))
                      }
                    </select>
                    {errors.category && <div className="invalid-feedback">{(errors.category.message?.toString())}</div>}
                  </div>
                </div>
                <hr />
                <div className="text-center mb-3">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Save</span>
                  </button>
                  <button type="submit" onClick={handleNewPostCancelClick} className="btn btn-primary btn-block ms-2" disabled={loading}>
                    <span>Close</span>
                  </button>
                </div>
                <Alerts
                  alertMessage={alertMessage}
                  errorMessage={errorMessage}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>  
  );
}

export default PanelNewPostForm;