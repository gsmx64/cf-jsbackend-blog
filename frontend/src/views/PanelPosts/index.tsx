import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelPosts from "../../components/PanelPosts";
import usePostsStore from "../../state/stores/posts";
import { isZustandEnabled } from "../../constants/defaultConstants";
import usePosts from "../../hooks/usePosts";


const PanelPostsViewDefault = () => {
  return usePosts();
}

const PanelPostsViewZustand = () => {
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
    fetchPosts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { posts, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, setCurrentPage,
    handleUpdateStatusPost, handleDeletePost }
}

const PanelPostsView = ({ currentUser, settings, searchTerm }: any) => {
  const { posts, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, setCurrentPage,
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
          loading={loading}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          onUpdateStatusPost={handleUpdateStatusPost}
          onDeletePost={handleDeletePost}
          currentUser={currentUser}
          settings={settings}
          searchTerm={searchTerm}
        />
      </div>
    </>
  );
};

export default PanelPostsView;