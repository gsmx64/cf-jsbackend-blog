import { Link } from "react-router-dom";

import styles from './PostItem.module.css';
import BootstrapLink from "../../../BootstrapLink";


const PostItem = ({ post, currentUser, onPostClick }: any) => {
  const date = new Date(post?.updateAt);
  
  const handleSeeMoreClick = (event: any) => {
    event.stopPropagation();
    onPostClick(post?.id);
  };

  return (
    <div className={styles.postsContainer}>
      <BootstrapLink />
      <div className={styles.imageContainer}>
        <img src={post?.image} width={200} height={200} alt={post?.title} className="rounded" />
      </div>
      <div className={styles.postsContentContainer}>
        <h4 className="h4">{post?.title}</h4>
        <p className={styles.postsContent}>{post?.content}</p>
        <div className="d-flex">
          <div className="align-self-start">
            <button onClick={handleSeeMoreClick} className="btn btn-outline-secondary">
              Ver mas
            </button>
            {/*<Link to={`/post/${post?.id}`} className="btn btn-outline-secondary">
              <span className="text-info">Ver mas</span>
            </Link>*/}
          </div>
          <div className="float-end pt-1 ps-2">
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
                <span className="text-info font-weight-bold">{post?.author?.username}</span>
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
                <i className="bi bi-calendar2-date pb-1 pe-1"></i>
                <small>{date.toLocaleString()}hs.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;