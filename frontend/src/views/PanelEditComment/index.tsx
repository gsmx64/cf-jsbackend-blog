import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelEditCommentForm from "../../components/PanelEditCommentForm";
import PanelCommentsView from "../PanelComments";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCommentStore from "../../state/stores/comment";
import useCurrentUserStore from "../../state/stores/currentUser";
import useComment from "../../hooks/useComment";


const PanelEditCommentViewDefault = () => {
  return useComment();
}

const PanelEditCommentViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const { commentId } = useParams();
  const comment = useCommentStore((state) => state.comment);
  const loading = useCommentStore((state) => state.loading);
  const alertMessage = useCommentStore((state) => state.alertMessage);
  const errorMessage = useCommentStore((state) => state.errorMessage);
  const fetchComment = useCommentStore((state) => state.fetchComment);
  const handleEditCommentSaveClick = useCommentStore((state) => state.handleEditCommentSaveClick);

  useEffect(() => {
    fetchCurrentUser();
    fetchComment(commentId);
  }, []);

  return { commentId, comment, loading, alertMessage, errorMessage, currentUser,
    handleEditCommentSaveClick
   }
}

const PanelEditCommentView = ({searchTerm}: any) => {
  const { commentId, comment, loading, alertMessage, errorMessage, currentUser,
    handleEditCommentSaveClick } = (
    isZustandEnabled) ? PanelEditCommentViewZustand() : PanelEditCommentViewDefault();
  const navigate = useNavigate();

  const handleEditCommentCancelClick = () => {
    navigate(`/list-comments`);
  };

  return (
    <>
      {
      (searchTerm === '') ? (
        <>
          <div className="container">
            <PanelEditCommentForm
              commentId={commentId}
              comment={comment}
              userRole={
                (currentUser?.role != null) ?
                (currentUser.role) : null}
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              loading={loading}
              onEditCommentSaveClick={(id: string | undefined, data: any) => handleEditCommentSaveClick(id as string, data)}
              onEditCommentCancelClick={handleEditCommentCancelClick}
            />
          </div>
        </>
      ) : (
        <>
          <PanelCommentsView />
        </>
      )
      }
    </>
  );
};

export default PanelEditCommentView;