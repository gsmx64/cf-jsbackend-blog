import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";
import Loading from "../Loading";


const PanelEditPostForm = ({ postId, post, categories, loading, alertMessage,
  errorMessage, onEditPostSaveClick, onEditPostCancelClick }: any) => {
  const navigate = useNavigate();
  const activeCategories = Array.from(categories);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      values: {
        title: post.title,
        description: post.description,
        image: post.image,
        content: post.content,
        category: post.category.id,
        status: post.status
      },
    }
  );

  const onSubmitHandler = (body: any) => {
    const saveSuccessful = onEditPostSaveClick(postId, body);
    if (saveSuccessful !== undefined) {
      navigate(`/list-posts`);
    }
  }

  const handleNewPostCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onEditPostCancelClick();
  };

  return (
    <>
      {post && loading ? (
        <Loading />
      ) : (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  noValidate
                  className="needs-validation"
                >
                <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">Edit Post</i></h6>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Title</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      id="title"
                      placeholder="Post title"
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
                      placeholder="Post description"
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
                      placeholder="Post image"
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
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Content</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <textarea
                      id={`post-content-textarea`}
                      placeholder="Post content"
                      autoComplete="off"
                      className={`${(
                        (isSubmitted && errors?.content) ?
                        "form-control is-invalid" :
                        (isSubmitted && errors?.content === undefined) ?
                        "form-control is-valid" :
                        "form-control"
                      )}`}
                      {...register('content')}
                      rows={10}
                    />
                    {errors.content && <div className="invalid-feedback">{(errors.content.message?.toString())}</div>}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Category</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <select
                      id={`post-select-category`}
                      className="form-select form-select-sm pe-14"
                      style={{minWidth:124 }}
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
                      {post.createAt}
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
                      {post.updateAt}
                    </span>
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
                  <button type="submit" onClick={handleNewPostCancelClick} className="btn btn-primary btn-block ms-2" disabled={loading}>
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
        </>
      )}
    </>  
  );
}

export default PanelEditPostForm;