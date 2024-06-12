import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelUsers from "../../components/PanelUsers";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useUsers from "../../hooks/useUsers";
import useUsersStore from "../../state/stores/users";


const PanelUsersViewDefault = () => {
  return useUsers();
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

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { users, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, setCurrentPage, handleUpdateUserRole,
    handleBanUser, handleActivateUser, handleDeleteUser }
}

const PanelUsersView = ({ currentUser, settings, searchTerm }: any) => {
  const { users, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, setCurrentPage,
    handleUpdateUserRole, handleBanUser, handleActivateUser, handleDeleteUser
  } = (isZustandEnabled) ? PanelUsersViewZustand() : PanelUsersViewDefault();

  return (
    <>
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
          currentUser={currentUser}
          settings={settings}
        />
      </div>
    </>
  );
};

export default PanelUsersView;