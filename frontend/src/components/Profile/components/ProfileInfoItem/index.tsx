const ProfileInfoItem = ({ user, canEdit, onProfileEditClick }: any) => {
  const handleProfileEditClick = (event: any) => {
    event.stopPropagation();
    onProfileEditClick(user?.id);
  };

  var formatDate = (currentDate: string) => {
    var new_date = new Date(currentDate);
    return currentDate ? `${new_date.toLocaleString()}hs.` : '';
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">User data</i></h6>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Username</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user?.username}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Name</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user?.firstName}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Lastname</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user?.lastName}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user?.email}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Age</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user?.age}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">City</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user?.city}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Country</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user?.country}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Created</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {formatDate(user?.createAt)}
          </div>
        </div>
        <hr />
        {
          (canEdit === 1) &&
          <div className="row">
            <div className="col-sm-12">
              <button onClick={handleProfileEditClick} className="btn btn-info">
                Edit
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ProfileInfoItem;