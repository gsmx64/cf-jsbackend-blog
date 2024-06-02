import { create } from "zustand";
import { AxiosResponse } from "axios";

import SettingsService from "../../services/settings.service";
import { initialSettingsStoreState, IUseSettingsStore } from "../interfaces/settings.interface";


const useSettingsStore = create<IUseSettingsStore>((set) => ({
  ...initialSettingsStoreState,
  fetchSettings: (alert: boolean = false) => {
    try {
      return SettingsService
      .get()
      .then((response: AxiosResponse) => {
        set(() => ({ settings: response.data }));
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: (alert) ? error.toString()+" :: "+JSON.stringify(error.response) : '' }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: (alert) ? error.toString() : '', loading: false }));
    }
  },
  handleEditSettingsSaveClick: (data: any) => {
    try {  
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return SettingsService
      .update(data)
      .then((response: AxiosResponse) => {
        if(response.data.affected === 1) {
          set(() => ({ alertMessage: 'Settings for blog saved!' }));
        }
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  }
}));

export default useSettingsStore;