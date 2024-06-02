import ISettings, { initISettings } from "../../interfaces/settings.interface";


export interface IUseSettingsStore {
  settings: ISettings;
  loading: boolean;
  alertMessage: string;
  errorMessage: string;
  fetchSettings: (alert: boolean) => void;
  handleEditSettingsSaveClick: (data: any) => void;
}

export const initialSettingsStoreState = {
  settings: initISettings,
  loading: false,
  alertMessage: '',
  errorMessage: ''
}