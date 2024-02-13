import React from "react";

import styles from './PostItem.module.css';
import { Link } from "react-router-dom";


const PostItem = ({ id, title, image, content, status, author_id, author_username,
  author_status, category, updateAt, userRole, onPostClick }: any): React.JSX.Element => {
  const handleSeeMoreClick = (event: any) => {
    event.stopPropagation();
    onPostClick(id);
  };

  const date = new Date(updateAt);

  return (
    <div className={styles.postsContainer}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
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
          <div className="align-self-end float-end ps-2">
            <div className="col input-group input-group-sm">
              <div className="input-group-text">
                <i className="bi bi-tags pb-1 pe-2"></i>
                <small>{category}</small>
              </div>
              <div className="input-group-text">
                <i className="bi bi-person-circle pb-1 pe-2"></i>
                <Link to={`/user/${author_id}`} className="btn">
                  <small>{author_username}</small>
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
                <i className="bi bi-calendar2-date pb-1 pe-2"></i>
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