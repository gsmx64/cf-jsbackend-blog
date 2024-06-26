import { create } from "zustand";
import { AxiosResponse } from "axios";

import UsersService from "../../services/users.service";
import { initialUsersStoreState, IUseUsersStore } from "../interfaces/users.interface";


const useUsersStore = create<IUseUsersStore>((set, get) => ({
  ...initialUsersStoreState,
  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
  fetchUsers: (currentPage: number, itemsPerPage: number) => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return UsersService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        set(() => ({
          users: response.data.data,
          totalPages: response.data?.meta?.totalPages,
          totalItems: response.data?.meta?.totalItems,
          itemsPerPage: response.data?.meta?.itemsPerPage,
          loading: false
        }));
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
  },
  handleUpdateUserRole: (id: string, username: string, role: string) => {
    try {
      const data = {role: role};
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return UsersService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Role changed to "${role}" to the user: "${username}"` }));
          get().fetchUsers(get().currentPage, get().itemsPerPage);
        } else {  
          set(() => ({ errorMessage: `Error changing role to user "${username}". User not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleBanUser: (id: string, username: string, ban: boolean) => {
    try {
      const data = ban ? {status: 'BANNED'} : {status: 'ENABLED'};
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return UsersService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (ban && response.data.affected === 1) {
          set(() => ({ alertMessage: `The user "${username}" was banned. Status: "${data.status}"` }));
          get().fetchUsers(get().currentPage, get().itemsPerPage);
        } else if (!ban && response.data.affected === 1) {
          set(() => ({ alertMessage: `The user "${username}" was unbanned. Status: "${data.status}"` }));
          get().fetchUsers(get().currentPage, get().itemsPerPage);
        } else {  
          set(() => ({ errorMessage: `Error changing ban status to user "${username}"! User not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleActivateUser: (id: string, username: string, activate: boolean) => {
    try {
      const data = activate ? {status: 'ENABLED'} : {status: 'PENDING'};
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return UsersService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1 && activate) {
          set(() => ({ alertMessage: `The user ${username} was activate. Status: "${data.status}"` }));
          get().fetchUsers(get().currentPage, get().itemsPerPage);
        } else if (response.data.affected === 1 && !activate) {
          set(() => ({ alertMessage: `The user ${username} was deactivate. Status: "${data.status}"` }));
          get().fetchUsers(get().currentPage, get().itemsPerPage);
        } else {  
          set(() => ({ errorMessage: `Error changing activation status to user "${username}"! User not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleDeleteUser: (id: string, username: string) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return UsersService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Deleted user: "${username}".` }));
          get().fetchUsers(get().currentPage, get().itemsPerPage);
        } else {  
          set(() => ({ errorMessage: `Error deleting user: "${username}". User not found.` }));
        }
      })
      .catch((error: any) => {
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

export default useUsersStore;