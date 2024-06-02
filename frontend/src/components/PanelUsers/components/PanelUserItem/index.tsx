import { useState } from "react";
import { Link } from "react-router-dom";
import BootstrapLink from "../../../BootstrapLink";


const PanelUserItem = ({ id, username, avatar, email, karma, status,
  role, createAt, row_state, userRole, onUserItemUpdateUserRole,
  onUserItemBanUser, onUserItemActivateUser, onUserItemDeleteUser }: any) => {
  const [selectedRole, setSelectedRole] = useState(role);
  const [selectedStatus, setSelectedStatus] = useState(status);
  
  const handlePostItemUpdateUserRole = (event: any) => {
    event.stopPropagation();
    setSelectedRole(event.target.value);
    onUserItemUpdateUserRole(id, username, event.target.value);
  };

  const handleUserItemBanUser = (event: any) => {
    event.stopPropagation();
    onUserItemBanUser(id, username, true);

    setSelectedStatus('BANNED');
  };

  const handleUserItemUnBanUser = (event: any) => {
    event.stopPropagation();
    onUserItemBanUser(id, username, false);

    setSelectedStatus('ENABLED');
  };

  const handleUserItemActivateUser = (event: any) => {
    event.stopPropagation();
    onUserItemActivateUser(id, username, true);

    setSelectedStatus('ENABLED');
  };

  const handleUserItemUnActivateUser = (event: any) => {
    event.stopPropagation();
    onUserItemActivateUser(id, username, false);

    setSelectedStatus('PENDING');
  };

  const handleUserItemDeleteUser = (event: any) => {
    event.stopPropagation();
    onUserItemDeleteUser(id, username);
  };

  const createAtDate = new Date(createAt);

  return (
    <div className={"item-list row " + row_state}>
      <BootstrapLink />
      <div className="col">
        <Link to={`/user/${id}`}>
          <img
            src={avatar}
            width={38}
            height={38}
            alt={username}
            className="rounded"
          />
          <span className="ms-2">
            {username}
            {(selectedStatus === 'BANNED') && <i className="bi bi-ban"></i>}
          </span>
        </Link>
      </div>
      <div className="col">
        {email}
      </div>
      <div className="col">
        {karma}
      </div>
      <div className="col">
        {
          (userRole === 'ADMIN') ?
          (
            <select
              id={`user-select-role-${id}`}
              value={selectedRole}
              onChange={event => handlePostItemUpdateUserRole(event)}
              className="form-select form-select-sm pe-14"
              style={{minWidth:110 }}
            >
              <option value="BASIC">Basic</option>
              <option value="EDITOR">Editor</option>
              <option value="MODERATOR">Moderator</option>
              <option value="ADMIN">Admin</option>
            </select>
          ) : (
            <>
              {(selectedRole === 'BASIC') && 'Basic'}
              {(selectedRole === 'EDITOR') && 'Editor'}
              {(selectedRole === 'MODERATOR') && 'Moderator'}
              {(selectedRole === 'ADMIN') && 'Admin'}
            </>
          )
        }
      </div>
      <div className="col">
        {(selectedStatus === 'BANNED') && 'Banned'}
        {(selectedStatus === 'ENABLED') && 'Enabled'}
        {(selectedStatus === 'PENDING') && 'Activation Pending'}
      </div>
      <div className="col">
        <span>{createAtDate.toLocaleString()}hs.</span>
      </div>
      <div className="col">
        {
        ((userRole === 'ADMIN') || (userRole === 'MODERATOR')) && (
          <>
            <button
              className="btn btn-outline-secondary ms-1"
              onClick={handleUserItemBanUser}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Ban User"
            >
              <i className="bi bi-ban"></i>
            </button>
            <button
              className="btn btn-outline-secondary ms-1"
              onClick={handleUserItemUnBanUser}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="UnBan User"
            >
              <i className="bi bi-check-square"></i>
            </button>
          </>
        )}
        {(userRole === 'ADMIN') && (
          <>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={handleUserItemActivateUser}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Activate User"
            >
              <i className="bi bi-toggle-on"></i>
            </button>
            <button
              className="btn btn-outline-secondary ms-1"
              onClick={handleUserItemUnActivateUser}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="UnActivate User"
            >
              <i className="bi bi-toggle-off"></i>
            </button>
          </>
        )}
        {(userRole === 'ADMIN') && (
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={handleUserItemDeleteUser}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete User"
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PanelUserItem;