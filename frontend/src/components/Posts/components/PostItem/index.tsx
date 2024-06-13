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
          <div className="align-self-start me-2">
            <button onClick={handleSeeMoreClick} className="btn btn-outline-secondary">
              Ver mas
            </button>
            {/*<Link to={`/post/${post?.id}`} className="btn btn-outline-secondary">
              <span className="text-info">Ver mas</span>
            </Link>*/}
          </div>
          <div className="align-self-end">
            <div className="btn-group align-self-end" role="group">
              <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                <i className="bi bi-tags pb-1 pe-1"></i>
                <Link to={`/category/${post?.category?.id}`} style={{color: 'inherit'}}>
                  {post?.category?.title}
                </Link>
              </span>
              <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                <i className="bi bi-person-circle pb-1 pe-2"></i>
                <Link to={`/user/${post?.author?.id}`} style={{color: 'inherit'}}>
                  {post?.author?.username}
                  {(post?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
                </Link>
              </span>
              {(
                (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR' || currentUser?.role === 'EDITOR') &&
                  
                    <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                      <i className="bi bi-toggle-on pb-1 pe-1"></i>
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
      </div>
    </div>
  );
};

export default PostItem;