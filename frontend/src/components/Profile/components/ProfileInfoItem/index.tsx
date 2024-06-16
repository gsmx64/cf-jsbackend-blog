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
    <div className="border rounded-3 mb-3">
      <div className="card-body mb-3">
        <h6 className="d-flex align-items-center">
          <i className="material-icons text-info ps-2 pt-2">User data</i>
        </h6>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="text-center mb-0">Username</h6>
          </div>
          <div className="col-sm-9 font-weight-bold text-center">
            {user?.username}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="text-center mb-0">Name</h6>
          </div>
          <div className="col-sm-9 text-secondary text-center">
            {user?.firstName}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="text-center mb-0">Lastname</h6>
          </div>
          <div className="col-sm-9 text-secondary text-center">
            {user?.lastName}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="text-center mb-0">Email</h6>
          </div>
          <div className="col-sm-9 text-secondary text-center">
            {user?.email}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="text-center mb-0">Age</h6>
          </div>
          <div className="col-sm-9 text-secondary text-center">
            {user?.age}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="text-center mb-0">City</h6>
          </div>
          <div className="col-sm-9 text-secondary text-center">
            {user?.city}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="text-center mb-0">Country</h6>
          </div>
          <div className="col-sm-9 text-secondary text-center">
            {user?.country}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="text-center mb-0">Created</h6>
          </div>
          <div className="col-sm-9 text-secondary text-center">
            {formatDate(user?.createAt)}
          </div>
        </div>
        <hr />
        {
          (canEdit === 1) &&
          <div className="row text-center">
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