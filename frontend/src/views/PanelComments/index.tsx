import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelComments from "../../components/PanelComments";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useComments from "../../hooks/useComments";
import useCommentsStore from "../../state/stores/comments";
import useCurrentUserStore from "../../state/stores/currentUser";


const PanelCommentsViewDefault = () => {
  return useComments();
}

const PanelCommentsViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const comments = useCommentsStore((state) => state.comments);
  const currentPage = useCommentsStore((state) => state.currentPage);
  const totalPages = useCommentsStore((state) => state.totalPages);
  const totalItems = useCommentsStore((state) => state.totalItems);
  const itemsPerPage = useCommentsStore((state) => state.itemsPerPage);
  const loading = useCommentsStore((state) => state.loading);
  const alertMessage = useCommentsStore((state) => state.alertMessage);
  const errorMessage = useCommentsStore((state) => state.errorMessage);
  const setCurrentPage = useCommentsStore((state) => state.setCurrentPage);
  const fetchComments = useCommentsStore((state) => state.fetchComments);
  const handleDeleteComment = useCommentsStore((state) => state.handleDeleteComment);

  useEffect(() => {
    fetchCurrentUser();
    fetchComments(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { comments, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage,
    handleDeleteComment }
}

const PanelCommentsView = ({searchTerm}: any) => {
  const { comments, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, currentUser, setCurrentPage,
    handleDeleteComment
  } = (isZustandEnabled) ? PanelCommentsViewZustand() : PanelCommentsViewDefault();

  return (
    <>
      <div className="container">
        <PanelComments
          data={comments}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm}
          onDeleteComment={handleDeleteComment}
          userRole={
            (currentUser?.role != null) &&
            (currentUser.role)}
        />
      </div>
    </>
  );
};

export default PanelCommentsView;