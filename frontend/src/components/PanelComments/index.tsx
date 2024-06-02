import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PanelCommentItem from "./components/PanelCommentItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import { DEFAULT_NO_AVATAR_TINY } from "../../constants/defaultConstants";


const PanelComments = ({data, currentPage, setCurrentPage, totalPages, alertMessage,
  errorMessage, loading, searchTerm, userRole, onDeleteComment}: any) => {
  const navigate = useNavigate();

  const handleCommentEditComment = (id: string) => {
    navigate(`/edit-comment/${id}`, { state: id });
  };

  const handleCommentItemDeleteComment = (id: string, username: string) => {
    const shouldRemove = confirm(`Are you sure you want to delete the message of user "${username}"?`);
  
    if (shouldRemove) {
      onDeleteComment(id);
    }
  };

  const currentData = Array.from(data);

  return (
    <>
      <div className="container mt-3">
        <div className="font-weight-bold">
          <h4>Moderate Comments</h4>
        </div>
        {currentData && loading ? (
          <Loading />
        ) : (
          <>
            
              {!currentData ? (
                <div className="justify-content-center pt-20">
                  <p>No comments found!</p>
                </div>
              ) : (
                <div className="container-fluid">
                  <div className="row border-bottom">
                    <div className="col">Author</div>
                    <div className="col">Post Title</div>
                    <div className="col">Message</div>
                    <div className="col">Created Date</div>
                    <div className="col">Updated Date</div>
                    <div className="col"></div>
                  </div>
                  {currentData?.map((commentItem: any, idx: number) => {
                    if (searchTerm !== '') {
                      if (
                        !commentItem.message.toLowerCase().includes(searchTerm) &&
                        !commentItem?.author?.username.toLowerCase().includes(searchTerm) &&
                        !commentItem?.post?.title.toLowerCase().includes(searchTerm)
                      ) {
                        return '';
                      }
                    }

                    return (
                      <PanelCommentItem
                        key={`comment-item-${commentItem.id}`}
                        row_state={(idx % 2) ? 'odd' : 'even'}
                        author_id={commentItem?.author?.id}
                        author_username={commentItem?.author?.username}
                        author_avatar={commentItem?.author?.avatar ? commentItem?.author?.avatar : DEFAULT_NO_AVATAR_TINY}
                        author_status={commentItem?.author?.status}
                        post_id={commentItem?.post?.id}
                        post_title={commentItem?.post?.title}
                        message={commentItem.message}
                        createAt={commentItem.createAt}
                        updateAt={commentItem.updateAt}
                        userRole={userRole}
                        onCommentItemEditComment={handleCommentEditComment}
                        onCommentItemDeleteComment={handleCommentItemDeleteComment}
                        id={commentItem.id}
                      />
                    );
                  })}
                </div>
              )}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
              <Alerts
                alertMessage={alertMessage}
                errorMessage={errorMessage}
              />
          </>
        )}
      </div>
    </>
  );
};

export default memo(PanelComments);