import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PostItem from "./components/PostItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";


const Posts = ({data, currentPage, setCurrentPage, totalPages,
  errorMessage, loading, searchTerm, userRole}: any) => {
  const navigate = useNavigate();

  const handlePostItemClick = (id: string) => {
    navigate(`/post/${id}`, { state: id });
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
              <div className="justify-content-center">
                {currentData?.map((postItem: any) => {
                  if (searchTerm !== '') {
                    if (
                      !postItem.title.toLowerCase().includes(searchTerm) &&
                      !postItem.content.toLowerCase().includes(searchTerm)
                    ) {
                      return '';
                    }
                  }

                  return (
                    <PostItem
                      key={`post-item-${postItem.id}`}
                      title={postItem.title}
                      image={postItem.image}
                      content={postItem.content}
                      status={postItem.status}
                      author_id={postItem?.author?.id}
                      author_username={postItem?.author?.username}
                      author_status={postItem?.author?.status}
                      category_id={postItem?.category?.id}
                      category_title={postItem?.category?.title}
                      updateAt={postItem.updateAt}
                      userRole={userRole}
                      onPostClick={handlePostItemClick}
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
              alertMessage={''}
              errorMessage={errorMessage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default memo(Posts);