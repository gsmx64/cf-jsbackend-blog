import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelEditPostForm from "../../components/PanelEditPostForm";
import PanelPostsView from "../PanelPosts";
import { isZustandEnabled } from "../../constants/defaultConstants";
import usePostStore from "../../state/stores/post";
import usePost from "../../hooks/usePost";


const PanelEditPostViewDefault = () => {
  return usePost();
}

const PanelEditPostViewZustand = () => {
  const { postId } = useParams();
  const post = usePostStore((state) => state.post);
  const activeCategories = usePostStore((state) => state.activeCategories);
  const loading = usePostStore((state) => state.loading);
  const alertMessage = usePostStore((state) => state.alertMessage);
  const errorMessage = usePostStore((state) => state.errorMessage);
  const setReset = usePostStore((state) => state.setReset);
  const fetchPost = usePostStore((state) => state.fetchPost);
  const fetchActiveCategories = usePostStore((state) => state.fetchActiveCategories);
  const handleEditPostSaveClick = usePostStore((state) => state.handleEditPostSaveClick);

  useEffect(() => {
    fetchPost(postId);
    fetchActiveCategories();
  }, []);

  return { postId, post, activeCategories, loading, alertMessage, errorMessage,
    setReset, handleEditPostSaveClick
   }
}

const PanelEditPostView = ({ currentUser, settings, searchTerm }: any) => {
  const { postId, post, activeCategories, loading, alertMessage, errorMessage,
    setReset, handleEditPostSaveClick } = (
    isZustandEnabled) ? PanelEditPostViewZustand() : PanelEditPostViewDefault();
  const navigate = useNavigate();

  const handleEditPostCancelClick = () => {
    setReset();
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
              loading={loading}
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              onEditPostSaveClick={handleEditPostSaveClick}
              onEditPostCancelClick={handleEditPostCancelClick}
              currentUser={currentUser}
              settings={settings}
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