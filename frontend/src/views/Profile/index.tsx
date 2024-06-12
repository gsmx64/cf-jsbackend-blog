import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Profile from "../../components/Profile";
import AuthService from "../../services/auth.service";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useUser from "../../hooks/useUser";
import useUserStore from "../../state/stores/user";


const PanelProfileViewDefault = () => {
  const uId = AuthService.getCurrentUserId();
  return {...useUser(uId as string)};
}

const PanelProfileViewZustand = () => {
  const uId = AuthService.getCurrentUserId();
  const user = useUserStore((state) => state.user);
  const userComments = useUserStore((state) => state.userComments);
  const userPosts = useUserStore((state) => state.userPosts);
  const loading = useUserStore((state) => state.loading);
  const alertMessage = useUserStore((state) => state.alertMessage);
  const errorMessage = useUserStore((state) => state.errorMessage);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchUserComments = useUserStore((state) => state.fetchUserComments);
  const fetchUserPosts = useUserStore((state) => state.fetchUserPosts);
  const handleEditUserSaveClick = useUserStore((state) => state.handleEditUserSaveClick);

  useEffect(() => {
    fetchUser(uId);
    fetchUserComments(uId, 5);
    fetchUserPosts(uId, 5);
  }, []);

  return { user, userComments, userPosts, loading, alertMessage,
    errorMessage, handleEditUserSaveClick }
}

const ProfileView = ({ currentUser, settings }: any) => {
  const { user, userComments, userPosts, loading, alertMessage,
    errorMessage, handleEditUserSaveClick } = (
    isZustandEnabled) ? PanelProfileViewZustand() : PanelProfileViewDefault();

  return (
    <>
      <div className="container mt-3">
        <Profile
          user={user}
          comments={userComments}
          posts={userPosts}
          loading={loading}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          handleEditUserSaveClick={handleEditUserSaveClick}
          currentUser={currentUser}
          settings={settings}
        />
      </div>
    </>
  );
};

export default ProfileView;