import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelNewPostForm from "../../components/PanelNewPostForm";
import PostsView from "../Posts";
import { initIPostCreate } from "../../interfaces/post.interface";
import usePost from "../../hooks/usePost";


const PanelNewPostView = ({ currentUser, settings, searchTerm }: any) => {
  const { activeCategories, loading, alertMessage, errorMessage,
    handleNewPostSaveClick } = usePost();
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
              loading={loading}
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              onNewPostSaveClick={handleNewPostSaveClick}
              onNewPostCancelClick={handleNewPostCancelClick}
              currentUser={currentUser}
              settings={settings}
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