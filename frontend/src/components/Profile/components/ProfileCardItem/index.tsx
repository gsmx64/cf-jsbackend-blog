import { useEffect, useState } from "react";

import BootstrapLink from "../../../BootstrapLink";
import { DEFAULT_NO_AVATAR_TINY } from "../../../../constants/defaultConstants";


const ProfileCardItem = ({ user, /*onProfileKarmaLikeClick, onProfileKarmaDislikeClick*/ }: any) => {
  const [avatarUser, setAvatarUser] = useState<string>(user?.avatar);
  /*const handleKarmaLikeClick = (event: any) => {
    event.stopPropagation();
    onProfileKarmaLikeClick(event.target.value);
  };

  const handleKarmaDislikeClick = (event: any) => {
    event.stopPropagation();
    onProfileKarmaDislikeClick(event.target.value);
  };*/

  useEffect(() => {
    setAvatarUser(user?.avatar);
  }, [user?.avatar]);

  return (
    <div className="card">
      <BootstrapLink />
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <img src={avatarUser ? avatarUser : DEFAULT_NO_AVATAR_TINY} alt={user?.username} className="rounded" width="150" />
          <div className="mt-3">
            <h4>{user?.firstName ? user?.firstName : 'User not found'} {user?.lastName ? user?.lastName : ''}</h4>
            {(user?.status == 'PENDING') &&
              <div className="alert alert-warning d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>Activation pendding!</span>
              </div>}
            {(user?.status == 'BANNED') &&
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-ban link-danger"></i>
                <div>User banned!</div>
              </div>}
            <p className="text-secondary mb-1">
              {(user?.role == 'BASIC') && 'User'}
              {(user?.role == 'EDITOR') && 'Editor'}
              {(user?.role == 'MODERATOR') && 'Moderator'}
              {(user?.role == 'ADMIN') && 'Administrator'}
            </p>
            <p className="text-muted font-size-sm">{user?.city ? `${user?.city},` : ''} {user?.country ? user?.country : ''}</p>
            {
              /*(user?.karma) &&
              (
                <p className="font-size-sm">Karma: {user?.karma}</p>          
                <button onClick={handleKarmaLikeClick} className="fa fa-thumbs-up fa-lg">
                  Like
                </button>
                <button onClick={handleKarmaDislikeClick} className="fa fa-thumbs-down fa-lg">
                  Dislike
                </button>
              )*/
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardItem;