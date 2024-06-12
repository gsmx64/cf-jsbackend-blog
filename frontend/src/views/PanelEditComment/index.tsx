import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelEditCommentForm from "../../components/PanelEditCommentForm";
import PanelCommentsView from "../PanelComments";
import { isZustandEnabled } from "../../constants/defaultConstants";
import useCommentStore from "../../state/stores/comment";
import useComment from "../../hooks/useComment";


const PanelEditCommentViewDefault = () => {
  return useComment();
}

const PanelEditCommentViewZustand = () => {
  const { commentId } = useParams();
  const comment = useCommentStore((state) => state.comment);
  const loading = useCommentStore((state) => state.loading);
  const alertMessage = useCommentStore((state) => state.alertMessage);
  const errorMessage = useCommentStore((state) => state.errorMessage);
  const fetchComment = useCommentStore((state) => state.fetchComment);
  const handleEditCommentSaveClick = useCommentStore((state) => state.handleEditCommentSaveClick);

  useEffect(() => {
    fetchComment(commentId);
  }, []);

  return { commentId, comment, loading, alertMessage, errorMessage,
    handleEditCommentSaveClick
   }
}

const PanelEditCommentView = ({ currentUser, settings, searchTerm }: any) => {
  const { commentId, comment, loading, alertMessage, errorMessage,
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
              loading={loading}
              alertMessage={alertMessage}
              errorMessage={errorMessage}
              onEditCommentSaveClick={(id: string | undefined, data: any) => handleEditCommentSaveClick(id as string, data)}
              onEditCommentCancelClick={handleEditCommentCancelClick}
              currentUser={currentUser}
              settings={settings}
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