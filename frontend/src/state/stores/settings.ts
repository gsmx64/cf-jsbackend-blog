import { create } from "zustand";
import { AxiosResponse } from "axios";

import SettingsService from "../../services/settings.service";
import { initialSettingsStoreState, IUseSettingsStore } from "../interfaces/settings.interface";

const useSettingsStore = create<IUseSettingsStore>((set) => ({
  ...initialSettingsStoreState,
  fetchSettings: () => {
    try {
      return SettingsService
      .get()
      .then((response: AxiosResponse) => {
        set(() => ({
          settings: response.data
        }));
      });
    } catch (error: any) {
      console.log(error);
    }
  },
}));

export default useSettingsStore;