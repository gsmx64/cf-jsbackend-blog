import { useState } from "react";
import { Link } from "react-router-dom";
import BootstrapLink from "../../../BootstrapLink";


const PanelUserItem = ({ id, username, avatar, email, karma, status, role, createAt,
  row_state, onUserItemUpdateUserRole, onUserItemBanUser, onUserItemActivateUser, onUserItemDeleteUser }: any) => {
  const [selectedRole, setSelectedRole] = useState(role);
  const [selectedStatus, setSelectedStatus] = useState(status);
  
  const handlePostItemUpdateUserRole = (event: any) => {
    event.stopPropagation();
    setSelectedRole(event.target.value);
    onUserItemUpdateUserRole(id, username, event.target.value);
  };

  const handleUserItemBanUser = (event: any) => {
    event.stopPropagation();
    setSelectedStatus('BANNED');
    onUserItemBanUser(id, username, true);
  };

  const handleUserItemUnBanUser = (event: any) => {
    event.stopPropagation();
    setSelectedStatus('ENABLED');
    onUserItemBanUser(id, username, false);
  };

  const handleUserItemActivateUser = (event: any) => {
    event.stopPropagation();
    setSelectedStatus('ENABLED');
    onUserItemActivateUser(id, username, true);
  };

  const handleUserItemUnActivateUser = (event: any) => {
    event.stopPropagation();
    setSelectedStatus('PENDING');
    onUserItemActivateUser(id, username, false);
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
          <img src={avatar} width={38} height={38} alt={username} className="rounded" />
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
        <select
          id={`user-select-role-${id}`}
          value={selectedRole}
          onChange={event => handlePostItemUpdateUserRole(event)}
          className="form-select form-select-sm pe-14" style={{minWidth:110 }}
        >
          <option value="BASIC">Basic</option>
          <option value="EDITOR">Editor</option>
          <option value="MODERATOR">Moderator</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <div className="col">
        {(selectedStatus == 'BANNED') && 'Banned'}
        {(selectedStatus == 'ENABLED') && 'Enabled'}
        {(selectedStatus == 'PENDING') && 'Activation Pending'}
      </div>
      <div className="col">
        <span>{createAtDate.toLocaleString()}hs.</span>
      </div>
      <div className="col">
        <button className="btn btn-outline-secondary ms-1" onClick={handleUserItemBanUser}>
          <i className="bi bi-ban"></i>
        </button>
        <button className="btn btn-outline-secondary ms-1" onClick={handleUserItemUnBanUser}>
          <i className="bi bi-check-square"></i>
        </button>
        <button className="btn btn-outline-secondary ms-2" onClick={handleUserItemActivateUser}>
          <i className="bi bi-toggle-on"></i>
        </button>
        <button className="btn btn-outline-secondary ms-1" onClick={handleUserItemUnActivateUser}>
          <i className="bi bi-toggle-off"></i>
        </button>
        <button className="btn btn-outline-secondary ms-2" onClick={handleUserItemDeleteUser}>
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default PanelUserItem;