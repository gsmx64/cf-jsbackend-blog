import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import validationSchema from "./utils/validationSchema";
import Alerts from "../../../Alerts";


const ProfileInfoEditItem = ({ user, loading, alertMessage, errorMessage,
  onProfileEditCancelClick, onProfileEditSaveClick }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      values: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        age: user?.age,
        city: user?.city,
        country: user?.country,
      },
    }
  );

  const handleProfileCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onProfileEditCancelClick(user?.id);
  };

  const onSubmitHandler = (body: any) => {
    onProfileEditSaveClick(user?.id, body);
  }

  var formatDate = (currentDate: string) => {
    var new_date = new Date(currentDate);
    return currentDate ? `${new_date.toLocaleString()}hs.` : '';
  }

  return (
    <div className="border rounded-3 mb-3">
      <div className="card-body mb-3">
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            className="needs-validation"
          >
          <h6 className="d-flex align-items-center">
            <i className="material-icons text-info ps-2 pt-2">User data</i>
          </h6>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">Username</h6>
            </div>
            <div className="col-sm-9 font-weight-bold text-center">
              {user?.username}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">Name</h6>
            </div>
            <div className="col-sm-9 text-secondary text-center">
              <div className="me-3">
                <input
                  type="text"
                  id="firstName"
                  placeholder={user?.firstName}
                  className={`${(
                    (isSubmitted && errors?.firstName) ?
                    "form-control is-invalid text-center" :
                    (isSubmitted && errors?.firstName === undefined) ?
                    "form-control is-valid text-center" :
                    "form-control text-center"
                  )}`}
                  {...register('firstName')}
                />
                {errors.firstName && <div className="invalid-feedback">{(errors.firstName.message?.toString())}</div>}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">Lastname</h6>
            </div>
            <div className="col-sm-9 text-secondary text-center">
              <div className="me-3">
                <input
                  type="text"
                  id="lastName"
                  placeholder={user?.lastName}
                  className={`${(
                    (isSubmitted && errors?.lastName) ?
                    "form-control is-invalid text-center" :
                    (isSubmitted && errors?.lastName === undefined) ?
                    "form-control is-valid text-center" :
                    "form-control text-center"
                  )}`}
                  {...register('lastName')}
                />
                {errors.lastName && <div className="invalid-feedback">{(errors.lastName.message?.toString())}</div>}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">Email</h6>
            </div>
            <div className="col-sm-9 text-secondary text-center">
              <div className="me-3">
                <input
                  type="text"
                  id="email"
                  placeholder={user?.email}
                  autoComplete="off"
                  className={`${(
                    (isSubmitted && errors?.email) ?
                    "form-control is-invalid text-center" :
                    (isSubmitted && errors?.email === undefined) ?
                    "form-control is-valid text-center" :
                    "form-control text-center"
                  )}`}
                  {...register('email')}
                />
                {errors.email && <div className="invalid-feedback">{(errors.email.message?.toString())}</div>}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">Age</h6>
            </div>
            <div className="col-sm-9 text-secondary text-center">
              <div className="me-3">
                <input
                  type="text"
                  id="age"
                  placeholder={user?.age}
                  className={`${(
                    (isSubmitted && errors?.age) ?
                    "form-control is-invalid text-center" :
                    (isSubmitted && errors?.age === undefined) ?
                    "form-control is-valid text-center" :
                    "form-control text-center"
                  )}`}
                  {...register('age')}
                />
                {errors.age && <div className="invalid-feedback">{(errors.age.message?.toString())}</div>}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">City</h6>
            </div>
            <div className="col-sm-9 text-secondary text-center">
              <div className="me-3">
                <input
                  type="text"
                  id="city"
                  placeholder={user?.city}
                  className={`${(
                    (isSubmitted && errors?.city) ?
                    "form-control is-invalid text-center" :
                    (isSubmitted && errors?.city === undefined) ?
                    "form-control is-valid text-center" :
                    "form-control text-center"
                  )}`}
                  {...register('city')}
                />
                {errors.city && <div className="invalid-feedback">{(errors.city.message?.toString())}</div>}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">Country</h6>
            </div>
            <div className="col-sm-9">
              <div className="me-3">
                <input
                  type="text"
                  id="country"
                  placeholder={user?.country}
                  autoComplete="off"
                  className={`${(
                    (isSubmitted && errors?.country) ?
                    "form-control is-invalid text-center" :
                    (isSubmitted && errors?.country === undefined) ?
                    "form-control is-valid text-center" :
                    "form-control text-center"
                  )}`}
                  {...register('country')}
                />
                {errors.country && <div className="invalid-feedback">{(errors.country.message?.toString())}</div>}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="text-center mb-0">Created</h6>
            </div>
            <div className="text-center col-sm-9">
              {formatDate(user?.createAt)}
            </div>
          </div>
          <hr />
          <div className="text-center mb-3">
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
              onClick={handleProfileCancelClick}
              className="btn btn-primary btn-block ms-2"
              disabled={loading}
            >
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
  );
};

export default ProfileInfoEditItem;