import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelPostItem from "./components/PanelPostItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts"
import BootstrapLink from "../BootstrapLink";


const PanelPosts = ({data, currentPage, setCurrentPage, totalPages, alertMessage,
  errorMessage, loading, searchTerm, currentUser, onUpdateStatusPost,
  onDeletePost}: any) => {
  const navigate = useNavigate();

  const handlePostItemUpdateStatusPost = (id: string, status: string, title: string) => {
    onUpdateStatusPost(id, status, title);
  };

  const handlePostEditPost = (id: string) => {
    navigate(`/edit-post/${id}`, { state: id });
  };

  const handlePostItemDeletePost = (id: string, title: string) => {
    const shouldRemove = confirm(`Are you sure you want to delete "${title}"?`);
  
    if (shouldRemove) {
      onDeletePost(id, title);
    }
  };

  const currentData = Array.from(data);

  return (
    <>
      <div className="container mt-3">
        <div className="font-weight-bold">
          <h4>Posts</h4>
        </div>
        {currentData && loading ? (
          <Loading />
        ) : (
          <>
            {!currentData ? (
              <div className="justify-content-center pt-20">
                <p>No posts found!</p>
              </div>
            ) : (
              <div className="container-fluid">
                <BootstrapLink />
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Post Title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Author</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Updated Date</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((post: any, idx: number) => {
                      if (searchTerm !== '') {
                        if (
                          !post.title.toLowerCase().includes(searchTerm) &&
                          !post.content.toLowerCase().includes(searchTerm)
                        ) {
                          return '';
                        }
                      }

                      return (
                        <PanelPostItem
                          key={`post-item-${post.id}`}
                          idx={idx}
                          //row_state={(idx % 2) ? 'odd' : 'even'}
                          post={post}
                          onPostItemUpdateStatusPost={handlePostItemUpdateStatusPost}
                          onPostItemEditPost={handlePostEditPost}
                          onPostItemDeletePost={handlePostItemDeletePost}
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

export default PanelPosts;