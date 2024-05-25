import BootstrapLink from "../../../BootstrapLink";

const ProfileCardItem = ({ username, status, role, karma, avatar, firstName,
  lastName, city, country, onProfileKarmaLikeClick, onProfileKarmaDislikeClick }: any) => {
  const handleKarmaLikeClick = (event: any) => {
    event.stopPropagation();
    onProfileKarmaLikeClick(event.target.value);
  };

  const handleKarmaDislikeClick = (event: any) => {
    event.stopPropagation();
    onProfileKarmaDislikeClick(event.target.value);
  };

  return (
    <div className="card">
      <BootstrapLink />
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <img src={avatar} alt={username} className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>{firstName ? firstName : 'User not found'} {lastName ? lastName : ''}</h4>
            {(status == 'PENDING') &&
              <div className="alert alert-warning d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <div>Activation pendding!</div>
              </div>}
            {(status == 'BANNED') &&
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-ban"></i>
                <div>User banned!</div>
              </div>}
            <p className="text-secondary mb-1">
              {(role == 'BASIC') && 'User'}
              {(role == 'EDITOR') && 'Editor'}
              {(role == 'MODERATOR') && 'Moderator'}
              {(role == 'ADMIN') && 'Administrator'}
            </p>
            <p className="text-muted font-size-sm">{city ? `${city},` : ''} {country ? country : ''}</p>
            {karma &&
              <p className="font-size-sm">Karma: {karma}</p>
            }
            
            {karma &&
              <button onClick={handleKarmaLikeClick} className="fa fa-thumbs-up fa-lg">
                Like
              </button>
            }

            {karma &&
              <button onClick={handleKarmaDislikeClick} className="fa fa-thumbs-down fa-lg">
                Dislike
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardItem;