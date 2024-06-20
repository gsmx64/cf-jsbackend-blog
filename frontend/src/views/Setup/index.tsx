import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiStep from "react-multistep";
import { AxiosResponse } from "axios";

import RegisterForm from "../../components/RegisterForm";
import PanelSettingsForm from "../../components/PanelSettingsForm";
import PanelNewCategoryForm from "../../components/PanelNewCategoryForm";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCurrentUser from "../../hooks/useCurrentUser";
import useSettings from "../../hooks/useSettings";
import useCategory from "../../hooks/useCategory";
import useCurrentUserStore from "../../state/stores/currentUser";
import useSettingsStore from "../../state/stores/settings";
import { initICategoryCreate } from "../../interfaces/category.interface";
import Alerts from "../../components/Alerts";
import AuthService from "../../services/auth.service";
import SettingsService from "../../services/settings.service";


const SetupViewDefault = () => {
  const { loading: loadingAuth, alertMessage: alertMessageAuth, errorMessage: errorMessageAuth,
    handleRegisterUserSaveClick } = useCurrentUser();

  const { settings, loading: loadingSettings, alertMessage: alertMessageSettings,
    errorMessage: errorMessageSettings, handleEditSettingsSaveClick } = useSettings();

  return { settings, loadingAuth, alertMessageAuth, errorMessageAuth, loadingSettings,
    alertMessageSettings, errorMessageSettings, handleRegisterUserSaveClick,
    handleEditSettingsSaveClick };
}

const SetupViewZustand = () => {
  const { loading: loadingAuth, alertMessage: alertMessageAuth, errorMessage: errorMessageAuth,
    handleRegisterUserSaveClick } = useCurrentUserStore();

  const { settings, loading: loadingSettings, alertMessage: alertMessageSettings,
    errorMessage: errorMessageSettings, fetchSettings, handleEditSettingsSaveClick } = useSettingsStore();

  useEffect(() => {
    fetchSettings(true);
  }, []);

  return { settings, loadingAuth, alertMessageAuth, errorMessageAuth, loadingSettings,
    alertMessageSettings, errorMessageSettings, handleRegisterUserSaveClick,
    handleEditSettingsSaveClick };
}

const SetupView = () => {
  const { settings, loadingAuth, alertMessageAuth, errorMessageAuth, loadingSettings,
    alertMessageSettings, errorMessageSettings, handleRegisterUserSaveClick,
    handleEditSettingsSaveClick } = (isZustandEnabled) ? SetupViewZustand() : SetupViewDefault();

  const { loading: loadingCategory, alertMessage: alertMessageCategory, errorMessage: errorMessageCategory,
    handleNewCategorySaveClick } = useCategory();

  const navigate = useNavigate();
  
  const InstallSampleData = ({ title }: any) => {
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInstallSampleDataClick = (event: any) => {
      event.stopPropagation();
      try {
        AuthService
        .installSampleData()
        .then((response: AxiosResponse) => {
          setAlertMessage(response.data);
        })
        .catch((error: any) => {
          setErrorMessage(JSON.stringify(error.response.data.message));
        });
      } catch (error: any) {
        setErrorMessage(error.toString());
      }
    };
    
    title = title + ''; //Dummy code to avoid warning
    return (
      <>
        <section className="py-3 py-md-5 min-vh-99 d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <h1 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                    <span className="">Install sample data:</span>
                  </h1>
                  <button
                    className={(alertMessage && !errorMessage) ? "btn btn-secondary btn-block" : "btn btn-primary btn-block"}
                    disabled={(alertMessage && !errorMessage) ? true : false}
                    onClick={handleInstallSampleDataClick}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete Comment"
                  >
                    Click here to install sample data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Alerts
          alertMessage={alertMessage}
          errorMessage={errorMessage}
        />
      </>
    )
  };

  const FinishSetup = ({ title }: any) => {
    const handleDisableSetupClick = (event: any) => {
      event.stopPropagation();
      try {
        SettingsService
        .update({'setup': 0})
        .then(() => {});
      } catch (error: any) {
        console.log(error);
      }
      navigate('/');
    }
      
    title = title + ''; //Dummy code to avoid warning
    return (
      <section className="py-3 py-md-5 min-vh-99 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <span className="fw-bold">Thanks for choosing Cf-Blog!</span>
                </h1>
                <button
                    className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0"
                    onClick={handleDisableSetupClick}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete Comment"
                  >
                    Go to Home
                  </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  };

  return (
    (settings?.setup !== 0) ? (
      <>
        <div className="container mb-3 text-center">
          <MultiStep
            activeStep={0}
            prevButton={{title: 'Back'}}
            nextButton={{title: 'Forward'}}
          >
            <RegisterForm
              title="Step 1 - Register your user"
              settings={settings}
              loading={loadingAuth}
              alertMessage={alertMessageAuth}
              errorMessage={errorMessageAuth}
              onRegisterUserSaveClick={handleRegisterUserSaveClick}
              isSetup={true}
            />
            <PanelSettingsForm
              title="Step 2 - Edit settings"
              loading={loadingSettings}
              alertMessage={alertMessageSettings}
              errorMessage={errorMessageSettings}
              onEditSettingsSaveClick={handleEditSettingsSaveClick}
              isSetup={true}
            />
            <PanelNewCategoryForm
              title="Step 3 - Create a almost one category"
              category={initICategoryCreate}
              loading={loadingCategory}
              alertMessage={alertMessageCategory}
              errorMessage={errorMessageCategory}
              onNewCategorySaveClick={handleNewCategorySaveClick}
              isSetup={true}
            />
            <InstallSampleData
              title="Step 4 - Install sample data"
            />
            <FinishSetup
              title="Step 5 - All done!"
            />
          </MultiStep>
        </div>
      </>
    ) : (
      <div className="container">
        <h2 className="text-center">Setup is disabled!</h2>
      </div>
    )
  )
}

export default SetupView;