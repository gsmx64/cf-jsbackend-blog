import React from "react";

import styles from "./Post.module.css";


const Post = ({post, userRole}: any): React.JSX.Element => {

  const renderPost = () => {
    const date = new Date(post.updateAt);

    return (
      <div className={styles.postContainer}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
        <div className={styles.imageContainer}>
          <img src={post.image} width={200} height={200} alt={post.title} />
        </div>
        <h4 className="h4">{post.title}</h4>
        <small className="text-muted">{post.description}</small>
        <p className="lead">{post.content}</p>
        <div className="align-self-end float-end ps-2">
          <div className="col input-group input-group-sm">
            <div className="input-group-text">
              <i className="bi bi-tags pb-1 pe-2"></i>
              <small>{post.category.title}</small>
            </div>
            <div className="input-group-text">
              <i className="bi bi-person-circle pb-1 pe-2"></i>
              <small>{post.author.username}</small>
            </div>
            {(
              (userRole === 'ADMIN' || userRole === 'MODERATOR' || userRole === 'EDITOR') &&
                <div className="input-group-text"><i className="bi bi-toggle-on pb-1 pe-2"></i>
                  <small>
                    {(post.status == 'PUBLISHED') && ' Published'}
                    {(post.status == 'UNPUBLISHED') && ' Unpublished'}
                    {(post.status == 'ARCHIVED') && ' Archived'}
                    {(post.status == 'TRASHED') && ' Trashed'}
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
    )
  };

  return (
    <div>
      {renderPost()}
    </div>
  );
};

export default Post;