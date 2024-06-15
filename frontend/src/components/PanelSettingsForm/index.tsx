import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import validationSchema from "./utils/validationSchema";
import Alerts from "../Alerts";
import Loading from "../Loading";


const PanelSettingsForm = ({ settings, loading, alertMessage, errorMessage,
  onEditSettingsSaveClick, onEditSettingsCancelClick, isSetup }: any) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm(
    { 
      resolver: yupResolver(validationSchema),
      values: {
        brand: settings?.brand,
        activation: settings?.activation,
        terms: settings?.terms,
        facebook: settings?.facebook,
        instagram: settings?.instagram,
        twitterx: settings?.twitterx,
        linkedin: settings?.linkedin,
        youtube: settings?.youtube,
        tiktok: settings?.tiktok,
      },
    }
  );

  const handleSettingsCancelClick = (event: any) => {
    event.stopPropagation();
    reset();
    onEditSettingsCancelClick();
  };

  const onSubmitHandler = (body: any) => {
    onEditSettingsSaveClick(body);
  }

  return (
    <>
      {settings?.brand && loading ? (
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
                          placeholder={settings?.brand ? settings?.brand : 'Blog Brand Name'}
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
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">User account activation mode</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <select
                          id="settings-select-activation-mode"
                          defaultValue=""
                          className="form-select form-select-sm pe-14"
                          style={{minWidth: 124}}
                          {...register('activation')}
                        >
                          <option disabled value=""> - Select Mode - </option>
                          <option value="auto">Autoactivation</option>
                          <option value="email">Email</option>
                        </select>
                        {errors.activation && <div className="invalid-feedback">{(errors.activation.message?.toString())}</div>}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mt-2">Terms and conditions</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <textarea
                          id={`settings-terms-textarea`}
                          placeholder={settings?.terms ? settings?.terms : 'Write here your terms and conditions.'}
                          autoComplete="off"
                          className={`${(
                            (isSubmitted && errors?.terms) ?
                            "form-control is-invalid" :
                            (isSubmitted && errors?.brand === undefined) ?
                            "form-control is-valid" :
                            "form-control"
                          )}`}
                          {...register('terms')}
                          rows={10}
                        />
                        {errors.terms && <div className="invalid-feedback">{(errors.terms.message?.toString())}</div>}
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
                          placeholder={settings?.facebook ? settings?.facebook : 'Facebook Link'}
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
                          placeholder={settings?.instagram ? settings?.instagram : 'Instagram Link'}
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
                          placeholder={settings?.twitterx ? settings?.twitterx : 'X Link'}
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
                          placeholder={settings?.linkedin ? settings?.linkedin : 'LinkedIn Link'}
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
                          placeholder={settings?.youtube ? settings?.youtube : 'Youtube Link'}
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
                          placeholder={settings?.tiktok ? settings?.tiktok : 'TikTok Link'}
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
                    <button type="submit" onClick={handleSettingsCancelClick} className="btn btn-primary btn-block ms-2" disabled={loading}>
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
        </>
      )}
    </>
  );
}

export default PanelSettingsForm;