import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Post from "../../components/Post";
import PostsView from "../Posts";
import { isZustandEnabled } from "../../constants/defaultConstants";
import usePost from "../../hooks/usePost";
import usePostStore from "../../state/stores/post";
import Error404View from "../Error404";
import useComment from "../../hooks/useComment";
import useCommentStore from "../../state/stores/comment";


const PostViewDefault = () => {
  const { handleNewCommentSaveClick } = useComment(false);
  return {...usePost(), handleNewCommentSaveClick};
}

const PostViewZustand = () => {
  const { postId } = useParams();
  const post = usePostStore((state) => state.post);
  const loading = usePostStore((state) => state.loading);
  const alertMessage = usePostStore((state) => state.alertMessage);
  const errorMessage = usePostStore((state) => state.errorMessage);
  const fetchPost = usePostStore((state) => state.fetchPost);
  const handleNewCommentSaveClick = useCommentStore((state) => state.handleNewCommentSaveClick);

  useEffect(() => {
    fetchPost(postId);
  }, []);

  return { post, loading, alertMessage, errorMessage,
    handleNewCommentSaveClick }
}

const PostView = ({ currentUser, settings, searchTerm, setSearchTerm }: any) => {
  const { post, loading, alertMessage, errorMessage, handleNewCommentSaveClick } = (
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
                    currentUser={currentUser}
                    settings={settings}
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