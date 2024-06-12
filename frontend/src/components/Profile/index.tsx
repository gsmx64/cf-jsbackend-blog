import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProfileCardItem from "./components/ProfileCardItem";
//import ProfileSocialItem from "./components/ProfileSocialItem";
import ProfileInfoItem from "./components/ProfileInfoItem";
import ProfileCommentsItem from "./components/ProfileCommentsItem";
import ProfilePostsItem from "./components/ProfilePostsItem";
import ProfileInfoEditItem from "./components/ProfileInfoEditItem";
import Loading from "../Loading";
let canEdit = 0;


const Profile = ({ user, comments, posts, alertMessage, errorMessage, loading,
  currentUser, /*settings,*/ handleEditUserSaveClick }: any) => {
  const [karmaCounter, setKarmaCounter] = useState(user.karma);
  const urlPath = useLocation();
  const navigate = useNavigate();

  if(currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR') {
    canEdit = 1;
  } else {
    if(urlPath.pathname === '/profile') {
      canEdit = 1;
    } else {
      canEdit = 0;
    }
  }

  const handleProfileEditClick = (id: string) => {
    if(urlPath.pathname === '/profile'){
      navigate(`/profile/edit`);
    } else if(urlPath.pathname === `/user/${id}`) {
      if(currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR') {
        navigate(`/user/edit/${id}`, { state: id });
      } else {
        navigate(`/user/${id}`, { state: id });
      }
    }
  };

  const handleProfileEditCancelClick = (id: string) => {
    if(urlPath.pathname === '/profile/edit'){
      navigate(`/profile`);
    } else if(urlPath.pathname === `/user/edit/${id}`) {
      navigate(`/user/${id}`, { state: id });
    } else {
      navigate(`/`);
    }
  };

  const handleProfileKarmaLikeClick = (id: string) => {
    //do something
    if(karmaCounter === user?.karma){
      setKarmaCounter(user?.karma + 1);
    }

    //TODO: Update it in DB
    console.log(id);

    return setKarmaCounter(user?.karma);
  };

  const handleProfileKarmaDislikeClick = (id: string) => {
    //do something
    if(karmaCounter === user?.karma){
      setKarmaCounter(user?.karma - 1);
    }

    //TODO: Update it in DB
    console.log(id);

    return setKarmaCounter(user?.karma);
  };

  return (
    <>
      {user && loading ? (
        <Loading />
      ) : (
        <>
          <div className="row gutters-sm">

            <div className="col-md-4 mb-3">
              <ProfileCardItem
                key={`profile-card-item-${user?.id}`}
                user={user}
                onProfileKarmaLikeClick={handleProfileKarmaLikeClick}
                onProfileKarmaDislikeClick={handleProfileKarmaDislikeClick}
                currentUser={currentUser}
              />

              {/*user.social &&
                <ProfileSocialItem
                  key={`profile-social-item-${user?.id}`}
                  social={user?.social ? user?.social : '-'}
                />*/
              }
            </div>

            <div className="col-md-8">
              
              {
                (
                  urlPath.pathname === '/profile' ||
                  urlPath.pathname === `/user/${user?.id}`
                ) ? (
                  <ProfileInfoItem
                    key={`profile-info-item-${user.id}`}
                    user={user}
                    onProfileEditClick={handleProfileEditClick}
                    canEdit={canEdit}
                  />            
                ) : (
                  <ProfileInfoEditItem
                    key={`profile-info-item-${user?.id}`}
                    user={user}
                    onProfileEditSaveClick={handleEditUserSaveClick}
                    onProfileEditCancelClick={handleProfileEditCancelClick}
                    canEdit={canEdit}
                    loading={loading}
                    alertMessage={alertMessage}
                    errorMessage={errorMessage}
                    currentUser={currentUser}
                  />
                )
              }

              <div className="row gutters-sm">
                <ProfileCommentsItem
                  key={`profile-comments-item-${user?.id}`}
                  comments={comments}
                />

                <ProfilePostsItem
                  key={`profile-posts-item-${user?.id}`}
                  posts={posts}
                />
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;