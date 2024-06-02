import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelEditPostForm from "../../components/PanelEditPostForm";
import PanelPostsView from "../PanelPosts";
import { isZustandEnabled } from "../../constants/defaultConstants";
import usePostStore from "../../state/stores/post";
import usePost from "../../hooks/usePost";
import useCurrentUserStore from "../../state/stores/currentUser";


const PanelEditPostViewDefault = () => {
  return usePost();
}

const PanelEditPostViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const { postId } = useParams();
  const post = usePostStore((state) => state.post);
  const activeCategories = usePostStore((state) => state.activeCategories);
  const loading = usePostStore((state) => state.loading);
  const alertMessage = usePostStore((state) => state.alertMessage);
  const errorMessage = usePostStore((state) => state.errorMessage);
  const fetchPost = usePostStore((state) => state.fetchPost);
  const fetchActiveCategories = usePostStore((state) => state.fetchActiveCategories);
  const handleEditPostSaveClick = usePostStore((state) => state.handleEditPostSaveClick);

  useEffect(() => {
    fetchCurrentUser();
    fetchPost(postId);
    fetchActiveCategories();
  }, []);

  return { postId, post, activeCategories, loading, alertMessage, errorMessage, currentUser,
    handleEditPostSaveClick
   }
}

const PanelEditPostView = ({searchTerm}: any) => {
  const { postId, post, activeCategories, loading, alertMessage, errorMessage, currentUser,
    handleEditPostSaveClick } = (
    isZustandEnabled) ? PanelEditPostViewZustand() : PanelEditPostViewDefault();
  const navigate = useNavigate();

  const handleEditPostCancelClick = () => {
    navigate(`/list-posts`);
  };

  return (
    <>
      {
      (searchTerm === '') ? (
        <>
          <div className="container">
            <PanelEditPostForm
              postId={postId}
              post={post}
              categories={activeCategories}
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              loading={loading}
              userRole={
                (currentUser?.role != null) ?
                (currentUser.role) : null}
              onEditPostSaveClick={handleEditPostSaveClick}
              onEditPostCancelClick={handleEditPostCancelClick}
            />
          </div>
        </>
      ) : (
        <>
          <PanelPostsView />
        </>
      )
      }
    </>
  );
};

export default PanelEditPostView;