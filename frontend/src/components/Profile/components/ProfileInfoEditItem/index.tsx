import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import validationSchema from "./utils/validationSchema";
import Alerts from "../../../Alerts";


const ProfileInfoEditItem = ({ id, username, firstName, lastName, email,
  age, city, country, createAt, userRole, loading, alertMessage,
  errorMessage, onProfileEditCancelClick, onProfileEditSaveClick }: any) => {
  const urlPath = useLocation();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      defaultValues: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        city: city,
        country: country,
      },
    }
  );

  const navigate: NavigateFunction = useNavigate();

  const handleProfileCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onProfileEditCancelClick(id);
  };

  const onSubmitHandler = (body: any) => {
    const saveSuccessful = onProfileEditSaveClick(id, body);
    if (saveSuccessful !== undefined) {
      if(urlPath.pathname === '/profile/edit') {
        navigate(`/profile`);
      } else if(urlPath.pathname === `/user/edit/${id}`) {
        if(userRole === 'ADMIN' || userRole === 'MODERATOR') {
          navigate(`/user/${id}`, { state: id });
        } else {
          navigate(`/`);
        }
      }
    }
  }

  var formatDate = (currentDate: string) => {
    var new_date = new Date(currentDate);
    return currentDate ? `${new_date.toLocaleString()}hs.` : '';
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            className="needs-validation"
          >
          <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">User data</i></h6>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Username</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {username}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Name</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="firstName"
                placeholder={firstName}
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
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Lastname</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="lastName"
                placeholder={lastName}
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
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Email</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="email"
                placeholder={email}
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
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Age</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="age"
                placeholder={age}
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
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">City</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                id="city"
                placeholder={city}
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
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Country</h6>
            </div>
            <div className="col-sm-9">
              <input
                type="text"
                id="country"
                placeholder={country}
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
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Created</h6>
            </div>
            <div className="col-sm-9">
              {formatDate(createAt)}
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
            <button type="submit" onClick={handleProfileCancelClick} className="btn btn-primary btn-block ms-2" disabled={loading}>
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
};

export default ProfileInfoEditItem;