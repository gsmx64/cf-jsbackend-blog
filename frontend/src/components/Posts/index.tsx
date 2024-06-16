import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PostItem from "./components/PostItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import { IPostArray } from "../../interfaces/post.interface";
import ISettings from "../../interfaces/settings.interface";
import IUser from "../../interfaces/user.interface";


interface PostsProps {
  posts: IPostArray[] | any;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  loading: boolean;
  errorMessage: Error | string | unknown;
  currentUser: IUser | undefined;
  settings: ISettings;
  searchTerm: string;
}

const Posts = ({ posts, currentPage, setCurrentPage, totalPages, currentUser,
  /*settings,*/ errorMessage, loading, searchTerm }: PostsProps) => {
  const navigate = useNavigate();
  let filteredPosts = 0;

  const handlePostItemClick = (id: string) => {
    navigate(`/post/${id}`, { state: id });
  };

  const postsData: IPostArray[] = posts ? Array.from(posts) : [];

  return (
    <>
      <div className="font-weight-bold text-center">
        <h4>Posts</h4>
      </div>
      {postsData && loading ? (
        <Loading />
      ) : (
        <>
          {!postsData ? (
            <div className="justify-content-center pt-20">
              <p className="text-center">No posts found!</p>
            </div>
          ) : (
            <div className="justify-content-center">
              {(postsData).map((post: any) => {
                if (searchTerm !== '') {
                  if (
                    !post.title.toLowerCase().includes(searchTerm) &&
                    !post.content.toLowerCase().includes(searchTerm)
                  ) {
                    filteredPosts++;
                    return;
                  }
                }

                return (
                  <PostItem
                    key={`post-item-${post?.id}`}
                    post={post}
                    currentUser={currentUser}
                    onPostClick={handlePostItemClick}
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
              <p className="text-center">No posts found!</p>
            </div>
          )}
          <Alerts
            alertMessage={''}
            errorMessage={errorMessage}
          />
        </>
      )}
    </>
  );
};

export default Posts;