import { useState, useEffect, useRef } from "react";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import PanelUsers from "../../components/PanelUsers";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import UsersService from "../../services/users.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import { IUserArray, initIUserArray } from "../../interfaces/user.interface";
import useUsersStore from "../../state/stores/users";
import { isZustandEnabled } from "../../constants/defaultConstants";


const PanelUsersViewDefault = () => {
  const [users, setUsers] = useState<IUserArray>(initIUserArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage);
    setCurrentUser(AuthService.getCurrentUser());
  }, [currentPage, itemsPerPage]);

  const fetchUsers = (currentPage: number, itemsPerPage: number) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return UsersService
    .getAll(currentPage, itemsPerPage)
    .then((response: AxiosResponse) => {
      setUsers(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setTotalItems(response.data.meta.totalItems);
      setItemsPerPage(15);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleUpdateUserRole = (id: string, username: string, role: string) => {
    const data = {role: role};
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return UsersService
    .update(id, data)
    .then((response: AxiosResponse) => {
      if (response.data.affected === 1) {
        setAlertMessage(`Role changed to ${role} to the user: ${username}`);
      } else {  
        setErrorMessage(`Error changing role to user ${username} with id: ${id}. User not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleBanUser = (id: string, username: string, ban: boolean) => {
    const data = ban ? {status: 'BANNED'} : {status: 'ENABLED'};
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return UsersService
    .update(id, data)
    .then((response: AxiosResponse) => {
      if (ban && response.data.affected === 1) {
        setAlertMessage(`The user ${username} was banned. Status: ${data.status}`);
      } else if (!ban && response.data.affected === 1) {
        setAlertMessage(`The user ${username} was unbanned. Status: ${data.status}`);
      } else {  
        setErrorMessage(`Error changing ban status to user ${username} with id: ${id}. User not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleActivateUser = (id: string, username: string, activate: boolean) => {
    const data = activate ? {status: 'ENABLED'} : {status: 'PENDING'};
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return UsersService
    .update(id, data)
    .then((response: AxiosResponse) => {
      if (response.data.affected === 1 && activate) {
        setAlertMessage(`The user ${username} was activate. Status: ${data.status}`);
      } else if (response.data.affected === 1 && !activate) {
        setAlertMessage(`The user ${username} was deactivate. Status: ${data.status}`);
      } else {  
        setErrorMessage(`Error changing activation status to user ${username} with id: ${id}. User not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleDeleteUser = (id: string) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return UsersService
    .remove(id)
    .then((response: AxiosResponse) => {
      if (response.data.affected === 1) {
        setAlertMessage(`Deleted user with id: ${id}.`);
      } else {  
        setErrorMessage(`Error deleting user with id: ${id}. User not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return { users, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage, handleUpdateUserRole,
    handleBanUser, handleActivateUser, handleDeleteUser }
}

const PanelUsersViewZustand = () => {
  const users = useUsersStore((state) => state.users);
  const currentPage = useUsersStore((state) => state.currentPage);
  const totalPages = useUsersStore((state) => state.totalPages);
  const totalItems = useUsersStore((state) => state.totalItems);
  const itemsPerPage = useUsersStore((state) => state.itemsPerPage);
  const loading = useUsersStore((state) => state.loading);
  const alertMessage = useUsersStore((state) => state.alertMessage);
  const errorMessage = useUsersStore((state) => state.errorMessage);
  const setCurrentPage = useUsersStore((state) => state.setCurrentPage);
  const fetchUsers = useUsersStore((state) => state.fetchUsers);
  const handleUpdateUserRole = useUsersStore((state) => state.handleUpdateUserRole);
  const handleBanUser = useUsersStore((state) => state.handleBanUser);
  const handleActivateUser = useUsersStore((state) => state.handleActivateUser);
  const handleDeleteUser = useUsersStore((state) => state.handleDeleteUser);
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { users, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage, handleUpdateUserRole,
    handleBanUser, handleActivateUser, handleDeleteUser }
}

const PanelUsersView = () => {
  const { users, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, currentUser, setCurrentPage,
    handleUpdateUserRole, handleBanUser, handleActivateUser, handleDeleteUser
  } = (isZustandEnabled) ? PanelUsersViewZustand() : PanelUsersViewDefault();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term.toLowerCase());
  }

  return (
    <>
      <Navbar
        onSearch={handleNavbarSearch}
        ref={containerRef}
      />
      <div className="container">
        <PanelUsers
          data={users}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm}
          onUpdateUserRole={handleUpdateUserRole}
          onBanUser={handleBanUser}
          onActivateUser={handleActivateUser}
          onDeleteUser={handleDeleteUser}
          userRole={
            (currentUser?.user?.role != null) &&
            (currentUser.user.role)}
        />
      </div>
      <Footer />
    </>
  );
};

export default PanelUsersView;