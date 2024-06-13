import "bootstrap/dist/css/bootstrap.min.css";

import PanelUserItem from "./components/PanelUserItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import BootstrapLink from "../BootstrapLink";


const PanelUsers = ({data, currentPage, setCurrentPage, totalPages, loading, searchTerm, alertMessage,
  errorMessage, currentUser, onUpdateUserRole, onBanUser, onActivateUser, onDeleteUser}: any) => {
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
                <BootstrapLink />
                <table className="table table-striped table-hover align-middle">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">Role</th>
                      <th scope="col">Created Date</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((user: any, idx: number) => {
                      if (searchTerm !== '') {
                        if (
                          !user.username.toLowerCase().includes(searchTerm) &&
                          !user.email.toLowerCase().includes(searchTerm)
                        ) {
                          return '';
                        }
                      }

                      return (
                        <PanelUserItem
                          key={`user-item-${user.id}`}
                          idx={idx}
                          row_state={(idx % 2) ? 'odd' : 'even'}
                          user={user}
                          onUserItemUpdateUserRole={handleUserItemUpdateUserRole}
                          onUserItemBanUser={handleUserItemBanUser}
                          onUserItemActivateUser={handleUserItemActivateUser}
                          onUserItemDeleteUser={handleUserItemDeleteUser}
                          currentUser={currentUser}
                        />
                      );
                    })}
                  </tbody>
                </table>
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

export default PanelUsers;