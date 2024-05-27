import ISettings, { initISettings } from "../../interfaces/settings.interface";

export interface IUseSettingsStore {
  settings: ISettings;
  fetchSettings: () => void;
}

export const initialSettingsStoreState = {
  settings: initISettings,
}