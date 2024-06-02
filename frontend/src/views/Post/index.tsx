import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Post from "../../components/Post";
import PostsView from "../Posts";
import { isZustandEnabled } from "../../constants/defaultConstants";
import usePost from "../../hooks/usePost";
import usePostStore from "../../state/stores/post";
import useCurrentUserStore from "../../state/stores/currentUser";
import Error404View from "../Error404";
import useComment from "../../hooks/useComment";
import useCommentStore from "../../state/stores/comment";


const PostViewDefault = () => {
  const { handleNewCommentSaveClick } = useComment(false);
  return {...usePost(), handleNewCommentSaveClick};
}

const PostViewZustand = () => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const fetchCurrentUser = useCurrentUserStore((state) => state.fetchCurrentUser);

  const { postId } = useParams();
  const post = usePostStore((state) => state.post);
  const loading = usePostStore((state) => state.loading);
  const alertMessage = usePostStore((state) => state.alertMessage);
  const errorMessage = usePostStore((state) => state.errorMessage);
  const fetchPost = usePostStore((state) => state.fetchPost);
  const handleNewCommentSaveClick = useCommentStore((state) => state.handleNewCommentSaveClick);

  useEffect(() => {
    fetchCurrentUser();
    fetchPost(postId);
  }, []);

  return { post, loading, alertMessage, errorMessage,
    currentUser, handleNewCommentSaveClick }
}

const PostView = ({searchTerm, setSearchTerm}: any) => {
  const { post, loading, alertMessage, errorMessage, currentUser,
    handleNewCommentSaveClick } = (
    isZustandEnabled) ? PostViewZustand() : PostViewDefault();

  return (
    <>
      {
        (searchTerm === '') ? (
          <>
            <div className="container">
              {
                (post?.title == undefined) ? (
                  <Error404View />
                ) : (
                  <Post
                    post={post}
                    loading={loading}
                    alertMessage={alertMessage}
                    errorMessage={errorMessage}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    userRole={
                      (currentUser?.role != null) ?
                      (currentUser.role) : null}
                    handleNewCommentSaveClick={handleNewCommentSaveClick}
                  />
                )
              }
            </div>
          </>
        ) : (
          <>
            <PostsView
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </>
        )
      }
    </>
  );
};

export default PostView;