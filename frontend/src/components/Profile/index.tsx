import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProfileCardItem from "./components/ProfileCardItem";
//import ProfileSocialItem from "./components/ProfileSocialItem";
import ProfileInfoItem from "./components/ProfileInfoItem";
import ProfileCommentsItem from "./components/ProfileCommentsItem";
import ProfilePostsItem from "./components/ProfilePostsItem";
import ProfileInfoEditItem from "./components/ProfileInfoEditItem";
import { DEFAULT_NO_AVATAR_MEDIUM } from "../../constants/defaultConstants";
import Alerts from "../Alerts";
import Loading from "../Loading";
let canEdit = 0;


const Profile = ({ user, comments, posts, alertMessage, errorMessage, loading,
  userRole, handleEditUserSaveClick }: any) => {
  const [karmaCounter, setKarmaCounter] = useState(user.karma);
  const urlPath = useLocation();
  const navigate = useNavigate();

  if(userRole === 'ADMIN' || userRole === 'MODERATOR') {
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
      if(userRole === 'ADMIN' || userRole === 'MODERATOR') {
        navigate(`/user/edit/${id}`, { state: id });
      } else {
        navigate(`/user/${id}`, { state: id });
      }
    }
  };

  const handleProfileEditCancelClick = (id: string) => {
    if(urlPath.pathname === '/profile/edit/'){
      navigate(`/profile`);
    } else if(urlPath.pathname === `/user/edit/${id}`) {
      navigate(`/user/${id}`, { state: id });
    }
  };

  const handleProfileKarmaLikeClick = (id: string) => {
    //do something
    if(karmaCounter === user.karma){
      setKarmaCounter(user.karma + 1);
    }

    //TODO: Update it in DB
    console.log(id);

    return setKarmaCounter(user.karma);
  };

  const handleProfileKarmaDislikeClick = (id: string) => {
    //do something
    if(karmaCounter === user.karma){
      setKarmaCounter(user.karma - 1);
    }

    //TODO: Update it in DB
    console.log(id);

    return setKarmaCounter(user.karma);
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
                key={`profile-card-item-${user.id ? user.id : '0'}`}
                username={user.username ? user.username : ''}
                status={user.status ? user.status : ''}
                role={user.role ? user.role : ''}
                karma={user.karma ? user.karma : ''}
                avatar={user.avatar ? user.avatar : DEFAULT_NO_AVATAR_MEDIUM}
                firstName={user.firstName ? user.firstName : ''}
                lastName={user.lastName ? user.lastName : ''}
                city={user.city ? user.city : ''}
                country={user.country ? user.country : ''}
                onProfileKarmaLikeClick={handleProfileKarmaLikeClick}
                onProfileKarmaDislikeClick={handleProfileKarmaDislikeClick}
              />

              {/*user.social &&
                <ProfileSocialItem
                  key={`profile-social-item-${user.id ? user.id : '0'}`}
                  social={user.social ? user.social : '-'}
                  id={user.id}
                />*/
              }
            </div>

            <div className="col-md-8">
              
              {
                (
                  urlPath.pathname === '/profile' ||
                  urlPath.pathname === `/user/${user.id}`
                ) ? (
                  <ProfileInfoItem
                    key={`profile-info-item-${user.id}`}
                    username={user.username}
                    email={user.email}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    age={user.age}
                    city={user.city}
                    country={user.country}
                    createAt={user.createAt}
                    onProfileEditClick={handleProfileEditClick}
                    canEdit={canEdit}
                    id={user.id}
                  />            
                ) : (
                  <ProfileInfoEditItem
                    key={`profile-info-item-${user.id}`}
                    username={user.username}
                    email={user.email}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    age={user.age}
                    city={user.city}
                    country={user.country}
                    createAt={user.createAt}
                    onProfileEditSaveClick={handleEditUserSaveClick}
                    onProfileEditCancelClick={handleProfileEditCancelClick}
                    canEdit={canEdit}
                    userRole={userRole}
                    loading={loading}
                    alertMessage={alertMessage}
                    errorMessage={errorMessage}
                    id={user.id}
                  />
                )
              }

              <div className="row gutters-sm">
                <ProfileCommentsItem
                  key={`profile-comments-item-${user.id}`}
                  comments={comments}
                  id={user.id}
                />

                <ProfilePostsItem
                  key={`profile-posts-item-${user.id}`}
                  role={user.role}
                  posts={posts}
                  id={user.id}
                />
              </div>

              <Alerts
                alertMessage={alertMessage}
                errorMessage={errorMessage}
              />

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;