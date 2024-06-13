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
      <div className="border p-3">
        <BootstrapLink />
        <div className={styles.imageContainer}>
          <img src={post?.image} width={200} height={200} alt={post?.title} className="rounded" />
        </div>
        <div className={styles.postsContentContainer}>
          <h4 className="h4">{post?.title}</h4>
          <p className="lead">{post?.description}</p>
          <div className="d-flex">
            <div className="align-self-end">
              <div className="btn-group align-self-end" role="group">
                <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                  <i className="bi bi-person-circle pb-2"></i>
                  <Link to={`/user/${post?.author?.id}`} style={{color: 'inherit'}}>
                  {post?.author?.username}
                    {(post?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
                  </Link>
                </span>
                {(
                  (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR' || currentUser?.role === 'EDITOR') &&
                    <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                      <i className="bi bi-toggle-on pb-1 pe-2"></i>
                      {(post?.status == 'PUBLISHED') && ' Published'}
                      {(post?.status == 'UNPUBLISHED') && ' Unpublished'}
                      {(post?.status == 'ARCHIVED') && ' Archived'}
                      {(post?.status == 'TRASHED') && ' Trashed'}
                    </span>
                )}
                <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                  <i className="bi bi-calendar2-date pb-1 pe-2"></i>
                  {date.toLocaleString()}hs.
                </span>
              </div>
            </div>
          </div>
          <div className="align-self-start mt-3">
            <button onClick={handleSeeMoreClick} className="btn btn-outline-secondary">
              Ver mas
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPostsItem;