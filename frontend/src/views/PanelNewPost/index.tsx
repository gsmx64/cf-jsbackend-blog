import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelNewPostForm from "../../components/PanelNewPostForm";
import PostsView from "../Posts";
import { initIPostCreate } from "../../interfaces/post.interface";
import usePost from "../../hooks/usePost";


const PanelNewPostView = ({searchTerm}: any) => {
  const { activeCategories, loading, alertMessage, errorMessage,
    currentUser, handleNewPostSaveClick } = usePost();
  const navigate = useNavigate();

  const handleNewPostCancelClick = () => {
    navigate(`/posts`);
  };

  return (
    <>
      {
      (searchTerm === '') ? (
        <>
          <div className="container">
            <PanelNewPostForm
              data={initIPostCreate}
              categories={activeCategories}
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              loading={loading}
              userRole={
                (currentUser?.role != null) ? 
                (currentUser.role) : null}
              onNewPostSaveClick={handleNewPostSaveClick}
              onNewPostCancelClick={handleNewPostCancelClick}
            />
          </div>
        </>
      ) : (
        <>
          <PostsView />
        </>
      )
      }
    </>
  );
};

export default PanelNewPostView;