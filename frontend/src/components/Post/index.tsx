import { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Post.module.css";
import BootstrapLink from "../BootstrapLink";
import CommentForm from "../CommentForm";
import Comments from "../Comments";
import Alerts from "../Alerts";
import Loading from "../Loading";
import IPost from "../../interfaces/post.interface";
import IUser from "../../interfaces/user.interface";
import ISettings from "../../interfaces/settings.interface";


interface PostProps {
  post: IPost;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | string | unknown;
  currentUser: IUser | undefined;
  settings: ISettings;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleNewCommentSaveClick: (postId: string, data: any) => void;
}

const Post = ({ post, alertMessage, errorMessage, loading, currentUser, /*settings,*/
  searchTerm, setSearchTerm, handleNewCommentSaveClick }: PostProps) => {
  const date = new Date(post?.updateAt);
  loading = (post?.id === '') ? true : loading;

  useEffect(() => {
    setSearchTerm('');
  }, [searchTerm]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.postContainer}>
            <BootstrapLink />
            <div className={styles.imageContainer}>
              <img src={post?.image} alt={post?.title} className="rounded img-thumbnail mx-auto d-block" />
            </div>
            <h4 className="h4">{post?.title}</h4>
            <small className="text-muted">{post?.description}</small>
            <p className="lead">{post?.content}</p>
            <div className="align-self-end float-end ps-2">
              <div className="col input-group input-group-sm">
                <div className="input-group-text">
                  <i className="bi bi-tags pb-1"></i>
                  <Link to={`/category/${post?.category?.id}`} className="badge">
                    <span className="text-info">{post?.category?.title}</span>
                  </Link>
                </div>
                <div className="input-group-text">
                  <i className="bi bi-person-circle pb-1"></i>                
                  <Link to={`/user/${post?.author?.id}`} className="badge">
                    <span className="text-info">{post?.author?.username}</span>
                    {(post?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
                  </Link>
                </div>
                {(
                  (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR' || currentUser?.role === 'EDITOR') &&
                    <div className="input-group-text"><i className="bi bi-toggle-on pb-1 pe-2"></i>
                      <small>
                        {(post?.status == 'PUBLISHED') && ' Published'}
                        {(post?.status == 'UNPUBLISHED') && ' Unpublished'}
                        {(post?.status == 'ARCHIVED') && ' Archived'}
                        {(post?.status == 'TRASHED') && ' Trashed'}
                      </small>
                    </div>
                )}
                <div className="input-group-text">
                  <i className="bi bi-calendar2-date pb-1 pe-2"></i>
                  <small>{date.toLocaleString()}hs.</small>
                </div>
              </div>
            </div>
            <div className="align-self-end float-end pt-4">
              {(currentUser?.role !== undefined) &&
                <div className="container-new-comment">
                  <CommentForm
                    postId={post?.id}
                    loading={loading}
                    alertMessage={alertMessage}
                    errorMessage={errorMessage}
                    onNewCommentSaveClick={handleNewCommentSaveClick}
                  />
                </div>
              }
              <div className="container-comments">
                <Comments comments={post?.comments} />
              </div>
            </div>
          </div>
          <Alerts
            alertMessage={''}
            errorMessage={errorMessage}
          />
        </>
      )}
    </>
  );
};

export default Post;