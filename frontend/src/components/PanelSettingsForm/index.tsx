import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AxiosResponse } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import SettingsService from "../../services/settings.service";
import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";
import Loading from "../Loading";


const PanelSettingsForm = ({ brand, facebook, instagram, twitterx,
  linkedin, youtube, tiktok, error, onSettingsCancelClick }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(error);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      defaultValues: {
        brand: brand ? brand : brand,
        facebook: facebook,
        instagram: instagram,
        twitterx: twitterx,
        linkedin: linkedin,
        youtube: youtube,
        tiktok: tiktok,
      },
    }
  );

  const navigate: NavigateFunction = useNavigate();

  const handleSettingsCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onSettingsCancelClick();
  };

  const onSubmitHandler = (data: any) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return SettingsService
    .update(data)
    .then((response: AxiosResponse) => {
      setLoading(false);        
      if(response.data) {
        setAlertMessage('Settings saved!');
        navigate('/');
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
    <>
      {brand && loading ? (
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
                <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">Blog Settings</i></h6>

                <div className="card">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">General Settings</i></h6>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">Brand</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          id="brand"
                          placeholder={brand ? brand : 'Blog Brand Name'}
                          className={`${(
                            (isSubmitted && errors?.brand) ?
                            "form-control is-invalid text-center" :
                            (isSubmitted && errors?.brand === undefined) ?
                            "form-control is-valid text-center" :
                            "form-control text-center"
                          )}`}
                          {...register('brand')}
                        />
                        {errors.brand && <div className="invalid-feedback">{(errors.brand.message?.toString())}</div>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">Social Media</i></h6>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">Facebook</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          id="facebook"
                          placeholder={facebook ? facebook : 'Facebook Link'}
                          className={`${(
                            (isSubmitted && errors?.facebook) ?
                            "form-control is-invalid text-center" :
                            (isSubmitted && errors?.facebook === undefined) ?
                            "form-control is-valid text-center" :
                            "form-control text-center"
                          )}`}
                          {...register('facebook')}
                        />
                        {errors.facebook && <div className="invalid-feedback">{(errors.facebook.message?.toString())}</div>}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">Instagram</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          id="instagram"
                          placeholder={instagram ? instagram : 'Instagram Link'}
                          className={`${(
                            (isSubmitted && errors?.instagram) ?
                            "form-control is-invalid text-center" :
                            (isSubmitted && errors?.instagram === undefined) ?
                            "form-control is-valid text-center" :
                            "form-control text-center"
                          )}`}
                          {...register('instagram')}
                        />
                        {errors.instagram && <div className="invalid-feedback">{(errors.instagram.message?.toString())}</div>}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">X</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          id="twitterx"
                          placeholder={twitterx ? twitterx : 'X Link'}
                          className={`${(
                            (isSubmitted && errors?.twitterx) ?
                            "form-control is-invalid text-center" :
                            (isSubmitted && errors?.twitterx === undefined) ?
                            "form-control is-valid text-center" :
                            "form-control text-center"
                          )}`}
                          {...register('twitterx')}
                        />
                        {errors.twitterx && <div className="invalid-feedback">{(errors.twitterx.message?.toString())}</div>}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">LinkedIn</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          id="linkedin"
                          placeholder={linkedin ? linkedin : 'LinkedIn Link'}
                          className={`${(
                            (isSubmitted && errors?.linkedin) ?
                            "form-control is-invalid text-center" :
                            (isSubmitted && errors?.linkedin === undefined) ?
                            "form-control is-valid text-center" :
                            "form-control text-center"
                          )}`}
                          {...register('linkedin')}
                        />
                        {errors.linkedin && <div className="invalid-feedback">{(errors.linkedin.message?.toString())}</div>}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">Youtube</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          id="youtube"
                          placeholder={youtube ? youtube : 'Youtube Link'}
                          className={`${(
                            (isSubmitted && errors?.youtube) ?
                            "form-control is-invalid text-center" :
                            (isSubmitted && errors?.youtube === undefined) ?
                            "form-control is-valid text-center" :
                            "form-control text-center"
                          )}`}
                          {...register('youtube')}
                        />
                        {errors.youtube && <div className="invalid-feedback">{(errors.youtube.message?.toString())}</div>}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">Tik Tok</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          id="tiktok"
                          placeholder={tiktok ? tiktok : 'TikTok Link'}
                          className={`${(
                            (isSubmitted && errors?.tiktok) ?
                            "form-control is-invalid text-center" :
                            (isSubmitted && errors?.tiktok === undefined) ?
                            "form-control is-valid text-center" :
                            "form-control text-center"
                          )}`}
                          {...register('tiktok')}
                        />
                        {errors.tiktok && <div className="invalid-feedback">{(errors.tiktok.message?.toString())}</div>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 mb-3">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Save</span>
                  </button>
                  <button type="submit" onClick={handleSettingsCancelClick} className="btn btn-primary btn-block ms-2" disabled={loading}>
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

export default PanelSettingsForm;