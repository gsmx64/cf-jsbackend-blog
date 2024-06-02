import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Posts from "../../components/Posts";
import { isZustandEnabled } from "../../constants/defaultConstants";
import usePosts from "../../hooks/usePosts";
import usePostsStore from "../../state/stores/posts";
import useCurrentUserStore from "../../state/stores/currentUser";


const PostsViewDefault = () => {
  return usePosts();
}

const PostsViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const posts = usePostsStore((state) => state.posts);
  const currentPage = usePostsStore((state) => state.currentPage);
  const totalPages = usePostsStore((state) => state.totalPages);
  const totalItems = usePostsStore((state) => state.totalItems);
  const itemsPerPage = usePostsStore((state) => state.itemsPerPage);
  const loading = usePostsStore((state) => state.loading);
  const errorMessage = usePostsStore((state) => state.errorMessage);
  const setCurrentPage = usePostsStore((state) => state.setCurrentPage);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);

  useEffect(() => {
    fetchCurrentUser();
    fetchPosts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { posts, currentPage, totalPages, totalItems, itemsPerPage,
    loading, errorMessage, currentUser, setCurrentPage }
}

const PostsView = ({searchTerm}: any) => {
  const { posts, currentPage, totalPages, totalItems, itemsPerPage, loading,
    errorMessage, currentUser, setCurrentPage } = (
      isZustandEnabled) ? PostsViewZustand() : PostsViewDefault();

  return (
    <>
      <div className="container">
        <Posts
          posts={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm}
          userRole={
            (currentUser?.role != null) ?
            (currentUser.role) : null}
        />
      </div>
    </>
  );
};

export default PostsView;