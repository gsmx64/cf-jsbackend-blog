import { Link } from "react-router-dom";

import BootstrapLink from '../../../BootstrapLink';
import styles from './MiniPostsItem.module.css';


const MiniPostsItem = ({ post, currentUser, onMiniPostClick }: any) => {
  
  const handleSeeMoreClick = (event: any) => {
    event.stopPropagation();
    onMiniPostClick(post?.id);
  };

  const date = new Date(post?.updateAt);

  return (
    <div className="col-6">
      <div className="p-3 border bg-light">
        <BootstrapLink />
        <div className={styles.imageContainer}>
          <img src={post?.image} width={200} height={200} alt={post?.title} className="rounded" />
        </div>
        <div className={styles.postsContentContainer}>
          <h4 className="h4">{post?.title}</h4>
          <p className="lead">{post?.description}</p>
          <div className="d-flex">
            <div className="align-self-start">
              <button onClick={handleSeeMoreClick} className="btn btn-outline-secondary">
                Ver mas
              </button>
            </div>
            <div className="align-self-end float-end ps-2">
              <div className="col input-group input-group-sm">
                <div className="input-group-text">
                  <i className="bi bi-person-circle pb-2"></i>
                  <Link to={`/user/${post?.author?.id}`} className="badge">
                  <span className="text-info font-weight-bold">{post?.author?.username}</span>
                    {(post?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
                  </Link>
                </div>
                {(
                  (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR' || currentUser?.role === 'EDITOR') &&
                    <div className="input-group-text">
                      <i className="bi bi-toggle-on pb-1 pe-2"></i>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPostsItem;