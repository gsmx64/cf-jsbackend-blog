import api from "../utils/useApi";
import AuthService from "./auth.service";
import ISettings from "../interfaces/settings.interface";


const update = (data: ISettings) => {
  return api.put<any>(
    `admin/settings/edit`,
    data,
    { headers: AuthService.authHeader() }
  );
};

const get = async () => {
  return await api.get<ISettings>(`settings/view`);
};

const SettingsService = {
  update,
  get
};
  
export default SettingsService;