import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelCommentItem from "./components/PanelCommentItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import BootstrapLink from "../BootstrapLink";


const PanelComments = ({data, currentPage, setCurrentPage, totalPages, alertMessage,
  errorMessage, loading, searchTerm, currentUser, onDeleteComment}: any) => {
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
                  <BootstrapLink />
                  <table className="table table-striped table-hover align-middle">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created Date</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData?.map((comment: any, idx: number) => {
                        if (searchTerm !== '') {
                          if (
                            !comment.message.toLowerCase().includes(searchTerm) &&
                            !comment?.author?.username.toLowerCase().includes(searchTerm) &&
                            !comment?.post?.title.toLowerCase().includes(searchTerm)
                          ) {
                            return '';
                          }
                        }

                        return (
                          <PanelCommentItem
                            key={`comment-item-${comment.id}`}
                            idx={idx}
                            //row_state={(idx % 2) ? 'odd' : 'even'}
                            comment={comment}
                            onCommentItemEditComment={handleCommentEditComment}
                            onCommentItemDeleteComment={handleCommentItemDeleteComment}
                            currentUser={currentUser}
                          />
                        );
                      })}
                    </tbody>
                  </table>
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

export default PanelComments;