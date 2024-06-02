import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PanelPostItem from "./components/PanelPostItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import { DEFAULT_NO_AVATAR_TINY } from "../../constants/defaultConstants";


const PanelPosts = ({data, currentPage, setCurrentPage, totalPages, alertMessage,
  errorMessage, loading, searchTerm, userRole, currentUser, onUpdateStatusPost,
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
                <div className="row border-bottom">
                  <div className="col">Image</div>
                  <div className="col">Post Title</div>
                  <div className="col">Category</div>
                  <div className="col">Author</div>
                  <div className="col">Status</div>
                  <div className="col">Created Date</div>
                  <div className="col">Updated Date</div>
                  <div className="col"></div>
                </div>
                {currentData?.map((postItem: any, idx: number) => {
                  if (searchTerm !== '') {
                    if (
                      !postItem.title.toLowerCase().includes(searchTerm) &&
                      !postItem.content.toLowerCase().includes(searchTerm)
                    ) {
                      return '';
                    }
                  }

                  return (
                    <PanelPostItem
                      key={`post-item-${postItem.id}`}
                      row_state={(idx % 2) ? 'odd' : 'even'}
                      title={postItem.title}
                      image={postItem.image}
                      content={postItem.content}
                      status={postItem.status}
                      author_id={postItem?.author?.id}
                      author_username={postItem?.author?.username}
                      author_avatar={postItem?.author?.avatar ? postItem?.author?.avatar : DEFAULT_NO_AVATAR_TINY}
                      author_status={postItem?.author?.status}
                      category_id={postItem?.category?.id}
                      category_title={postItem?.category?.title}
                      createAt={postItem.createAt}
                      updateAt={postItem.updateAt}
                      userRole={userRole}
                      currentUser={currentUser}
                      onPostItemUpdateStatusPost={handlePostItemUpdateStatusPost}
                      onPostItemEditPost={handlePostEditPost}
                      onPostItemDeletePost={handlePostItemDeletePost}
                      id={postItem.id}
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

export default memo(PanelPosts);