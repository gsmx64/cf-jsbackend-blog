import { memo } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import PanelUserItem from "./components/PanelUserItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import { DEFAULT_NO_AVATAR_TINY } from "../../constants/defaultConstants";


const PanelUsers = ({data, currentPage, setCurrentPage, totalPages, loading, searchTerm, alertMessage,
  errorMessage, userRole, onUpdateUserRole, onBanUser, onActivateUser, onDeleteUser}: any) => {
  const handleUserItemUpdateUserRole = (id: string, username: string, role: string) => {
    onUpdateUserRole(id, username, role);
  };

  const handleUserItemBanUser = (id: string, username: string, ban: boolean) => {
    ban ? 
      confirm(`Are you sure you want to ban user "${username}"?`) :
      confirm(`Are you sure you want to unban user "${username}"?`);

      onBanUser(id, username, ban);
  };

  const handleUserItemActivateUser = (id: string, username: string, activate: boolean) => {
    activate ?
      confirm(`Are you sure you want to activate user "${username}"?`) : 
      confirm(`Are you sure you want to deactivate user "${username}"?`);
  
    onActivateUser(id, username, activate); 
  };

  const handleUserItemDeleteUser = (id: string, username: string) => {
    const shouldRemove = confirm(`Are you sure you want to delete user "${username}"?`);
  
    if (shouldRemove) {
      onDeleteUser(id, username);
    }
  };

  const currentData = Array.from(data);

  return (
    <>
      <div className="container mt-3">
        <div className="font-weight-bold">
          <h4>Users</h4>
        </div>
        {currentData && loading ? (
          <Loading />
        ) : (
          <>
            {!currentData ? (
              <div className="justify-content-center pt-20">
                <p>No users found!</p>
              </div>
            ) : (
              <div className="container-fluid">
                <div className="row border-bottom">
                  <div className="col">Username</div>
                  <div className="col">Email</div>
                  <div className="col">Karma</div>
                  <div className="col">Status</div>
                  <div className="col">Role</div>
                  <div className="col">Created Date</div>
                  <div className="col"></div>
                </div>
                {currentData?.map((userItem: any, idx: number) => {
                  if (searchTerm !== '') {
                    if (
                      !userItem.username.toLowerCase().includes(searchTerm) &&
                      !userItem.email.toLowerCase().includes(searchTerm)
                    ) {
                      return '';
                    }
                  }

                  return (
                    <PanelUserItem
                      key={`user-item-${userItem.id}`}
                      row_state={(idx % 2) ? 'odd' : 'even'}
                      username={userItem.username}
                      avatar={userItem.avatar ? userItem.avatar : DEFAULT_NO_AVATAR_TINY}
                      email={userItem.email}
                      karma={userItem.karma}
                      status={userItem.status}
                      role={userItem.role}
                      createAt={userItem.createAt}
                      userRole={userRole}
                      onUserItemUpdateUserRole={handleUserItemUpdateUserRole}
                      onUserItemBanUser={handleUserItemBanUser}
                      onUserItemActivateUser={handleUserItemActivateUser}
                      onUserItemDeleteUser={handleUserItemDeleteUser}
                      id={userItem.id}
                    />
                  );
                })}
              </div>
            )}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <div className="mt-2"></div>
            <Alerts
              alertMessage={alertMessage}
              errorMessage={errorMessage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default memo(PanelUsers);