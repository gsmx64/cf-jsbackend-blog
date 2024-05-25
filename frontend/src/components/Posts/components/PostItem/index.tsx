import { Link } from "react-router-dom";

import styles from './PostItem.module.css';
import BootstrapLink from "../../../BootstrapLink";


const PostItem = ({ id, title, image, content, status, author_id, author_username,
  author_status, category_id, category_title, updateAt, userRole, onPostClick }: any) => {
  const handleSeeMoreClick = (event: any) => {
    event.stopPropagation();
    onPostClick(id);
  };

  const date = new Date(updateAt);

  return (
    <div className={styles.postsContainer}>
      <BootstrapLink />
      <div className={styles.imageContainer}>
        <img src={image} width={200} height={200} alt={title} className="rounded" />
      </div>
      <div className={styles.postsContentContainer}>
        <h4 className="h4">{title}</h4>
        <p className={styles.postsContent}>{content}</p>
        <div className="d-flex">
          <div className="align-self-start">
            <button onClick={handleSeeMoreClick} className="btn btn-outline-secondary">
              Ver mas
            </button>
          </div>
          <div className="float-end pt-1 ps-2">
            <div className="col input-group input-group-sm">
              <div className="input-group-text">
                <i className="bi bi-tags pb-1"></i>
                <Link to={`/category/${category_id}`} className="badge">
                  <span className="text-info">{category_title}</span>
                </Link>
              </div>
              <div className="input-group-text">
                <i className="bi bi-person-circle pb-1"></i>
                <Link to={`/user/${author_id}`} className="badge">
                <span className="text-info font-weight-bold">{author_username}</span>
                  {(author_status === 'BANNED') && <i className="bi bi-ban"></i>}
                </Link>
              </div>
              {(
                (userRole === 'ADMIN' || userRole === 'MODERATOR' || userRole === 'EDITOR') &&
                  <div className="input-group-text"><i className="bi bi-toggle-on pb-1 pe-2"></i>
                    <small>
                      {(status == 'PUBLISHED') && ' Published'}
                      {(status == 'UNPUBLISHED') && ' Unpublished'}
                      {(status == 'ARCHIVED') && ' Archived'}
                      {(status == 'TRASHED') && ' Trashed'}
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