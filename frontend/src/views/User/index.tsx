import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Profile from "../../components/Profile";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useUser from "../../hooks/useUser";
import useCurrentUserStore from "../../state/stores/currentUser";
import useUserStore from "../../state/stores/user";


const PanelUserViewDefault = () => {
  const { userId } = useParams();
  return {...useUser(userId as string), userId};
}

const PanelUserViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const { userId } = useParams();
  const user = useUserStore((state) => state.user);
  const userComments = useUserStore((state) => state.userComments);
  const userPosts = useUserStore((state) => state.userPosts);
  const loading = useUserStore((state) => state.loading);
  const errorMessage = useUserStore((state) => state.errorMessage);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchUserComments = useUserStore((state) => state.fetchUserComments);
  const fetchUserPosts = useUserStore((state) => state.fetchUserPosts);
  const handleEditUserSaveClick = useUserStore((state) => state.handleEditUserSaveClick);

  useEffect(() => {
    fetchCurrentUser();
    fetchUser(userId);
    fetchUserComments(userId, 5);
    fetchUserPosts(userId, 5);
  }, [loading]);

  return { userId, user, userComments, userPosts, loading, errorMessage,
    currentUser, handleEditUserSaveClick }
}

const UserView = () => {
  const { userId, user, userComments, userPosts, loading, errorMessage,
    currentUser, handleEditUserSaveClick } = (
    isZustandEnabled) ? PanelUserViewZustand() : PanelUserViewDefault();

  return (
    <>
      <div className="container mt-3">
        <Profile
          userId={userId}
          user={user}
          comments={userComments}
          posts={userPosts}
          loading={loading}
          errorMessage={errorMessage}
          userRole={
            (currentUser?.role != null) ? 
            (currentUser.role) : null}
          handleEditUserSaveClick={handleEditUserSaveClick}
        />
      </div>
    </>
  );
};

export default UserView;