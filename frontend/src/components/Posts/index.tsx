import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PostItem from "./components/PostItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import { IPostArray } from "../../interfaces/post.interface";


interface PostsProps {
  posts: IPostArray[] | any;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  loading: boolean;
  errorMessage: Error | string | unknown;
  searchTerm: string;
  userRole: string | null | undefined;
}

const Posts = ({posts, currentPage, setCurrentPage, totalPages,
  errorMessage, loading, searchTerm, userRole}: PostsProps) => {
  const navigate = useNavigate();
  let filteredPosts = 0;

  const handlePostItemClick = (id: string) => {
    navigate(`/post/${id}`, { state: id });
  };

  const postsData: IPostArray[] = posts ? Array.from(posts) : [];

  return (
    <>
      <div className="container mt-3">
        <div className="font-weight-bold">
          <h4>Posts</h4>
        </div>
        {postsData && loading ? (
          <Loading />
        ) : (
          <>
            {!postsData ? (
              <div className="justify-content-center pt-20">
                <p>No posts found!</p>
              </div>
            ) : (
              <div className="justify-content-center">
                {(postsData).map((postItem: any) => {
                  if (searchTerm !== '') {
                    if (
                      !postItem.title.toLowerCase().includes(searchTerm) &&
                      !postItem.content.toLowerCase().includes(searchTerm)
                    ) {
                      filteredPosts++;
                      return;
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
              totalPages={totalPages-filteredPosts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {(postsData.length === filteredPosts) && (
              <div className="justify-content-center pt-20">
                <p>No posts found!</p>
              </div>
            )}
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

export default Posts;