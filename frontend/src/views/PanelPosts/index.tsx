import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelPosts from "../../components/PanelPosts";
import usePostsStore from "../../state/stores/posts";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCurrentUserStore from "../../state/stores/currentUser";
import usePosts from "../../hooks/usePosts";


const PanelPostsViewDefault = () => {
  return usePosts();
}

const PanelPostsViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const posts = usePostsStore((state) => state.posts);
  const currentPage = usePostsStore((state) => state.currentPage);
  const totalPages = usePostsStore((state) => state.totalPages);
  const totalItems = usePostsStore((state) => state.totalItems);
  const itemsPerPage = usePostsStore((state) => state.itemsPerPage);
  const loading = usePostsStore((state) => state.loading);
  const alertMessage = usePostsStore((state) => state.alertMessage);
  const errorMessage = usePostsStore((state) => state.errorMessage);
  const setCurrentPage = usePostsStore((state) => state.setCurrentPage);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);
  const handleUpdateStatusPost = usePostsStore((state) => state.handleUpdateStatusPost);
  const handleDeletePost = usePostsStore((state) => state.handleDeletePost);

  useEffect(() => {
    fetchCurrentUser();
    fetchPosts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { posts, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage,
    handleUpdateStatusPost, handleDeletePost }
}

const PanelPostsView = ({searchTerm}: any) => {
  const { posts, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, currentUser, setCurrentPage,
    handleUpdateStatusPost, handleDeletePost
  } = (isZustandEnabled) ? PanelPostsViewZustand() : PanelPostsViewDefault();

  return (
    <>
      <div className="container">
        <PanelPosts
          data={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm}
          onUpdateStatusPost={handleUpdateStatusPost}
          onDeletePost={handleDeletePost}
          currentUser={currentUser}
          userRole={
            (currentUser?.role != null) ?
            (currentUser.role) : null}
        />
      </div>
    </>
  );
};

export default PanelPostsView;