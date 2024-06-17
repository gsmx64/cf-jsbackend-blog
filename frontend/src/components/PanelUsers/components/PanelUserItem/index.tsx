import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { DEFAULT_NO_AVATAR_TINY } from "../../../../constants/defaultConstants";


const PanelUserItem = ({ idx, user, currentUser, onUserItemUpdateUserRole,
  onUserItemBanUser, onUserItemActivateUser, onUserItemDeleteUser }: any) => {
  const [selectedRole, setSelectedRole] = useState(user?.role);
  const [selectedStatus, setSelectedStatus] = useState(user?.status);
  
  const handlePostItemUpdateUserRole = (event: any) => {
    event.stopPropagation();
    setSelectedRole(event.target.value);
    onUserItemUpdateUserRole(user?.id, user?.username, event.target.value);
  };

  const handleUserItemBanUser = (event: any) => {
    event.stopPropagation();
    onUserItemBanUser(user?.id, user?.username, true);
    setSelectedStatus('BANNED');
  };

  const handleUserItemUnBanUser = (event: any) => {
    event.stopPropagation();
    onUserItemBanUser(user?.id, user?.username, false);
    setSelectedStatus('ENABLED');
  };

  const handleUserItemActivateUser = (event: any) => {
    event.stopPropagation();
    onUserItemActivateUser(user?.id, user?.username, true);
    setSelectedStatus('ENABLED');
  };

  const handleUserItemUnActivateUser = (event: any) => {
    event.stopPropagation();
    onUserItemActivateUser(user?.id, user?.username, false);

    setSelectedStatus('PENDING');
  };

  const handleUserItemDeleteUser = (event: any) => {
    event.stopPropagation();
    onUserItemDeleteUser(user?.id, user?.username);
  };

  const createAtDate = new Date(user?.createAt);

  useEffect(() => {
    setSelectedRole(user?.role)
    setSelectedStatus(user?.status);
  }, [user?.role, user?.status]);

  return (
    <tr>
      <th scope="row">{(idx+1)}</th>
      <td>
        <Link to={`/user/${user?.id}`} style={{color: 'inherit'}}>
          <img
            src={user?.avatar ? user?.avatar : DEFAULT_NO_AVATAR_TINY}
            width={38}
            height={38}
            alt={user?.username}
            className="rounded"
          />
          <span className="ms-2">
            {user?.username}
            {(selectedStatus === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
          </span>
        </Link>
      </td>
      <td>
        {user?.email}
      </td>
      <td>
        {
          (currentUser?.role === 'ADMIN') ?
          (
            <select
              id={`user-select-role-${user?.id}`}
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
      </td>
      <td>
        {(selectedStatus === 'BANNED') && 'Banned'}
        {(selectedStatus === 'ENABLED') && 'Enabled'}
        {(selectedStatus === 'PENDING') && 'Activation Pending'}
      </td>
      <td>
        <span>{createAtDate.toLocaleString()}hs.</span>
      </td>
      <td>
        {
        ((currentUser?.role === 'ADMIN') || (currentUser?.role === 'MODERATOR')) && (
          <>
            <button
              className="btn btn-outline-danger ms-1"
              onClick={handleUserItemBanUser}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Ban User"
            >
              <i className="bi bi-ban"></i>
            </button>
            <button
              className="btn btn-outline-success ms-1"
              onClick={handleUserItemUnBanUser}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="UnBan User"
            >
              <i className="bi bi-check-square"></i>
            </button>
          </>
        )}
        {(currentUser?.role === 'ADMIN') && (
          <>
            <button
              className="btn btn-outline-primary ms-2"
              onClick={handleUserItemActivateUser}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Activate User"
            >
              <i className="bi bi-toggle-on"></i>
            </button>
            <button
              className="btn btn-outline-info ms-1"
              onClick={handleUserItemUnActivateUser}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="UnActivate User"
            >
              <i className="bi bi-toggle-off"></i>
            </button>
          </>
        )}
        {(currentUser?.role === 'ADMIN') && (
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
      </td>
    </tr>
  );
};

export default PanelUserItem;