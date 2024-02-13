import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Category.module.css";
import MiniPostsItem from "./components/MiniPostsItem";


const Category = ({category, userRole}: any): React.JSX.Element => {

  const navigate = useNavigate();

  const handleMiniPostItemClick = (id: string) => {
      navigate(`/post/${id}`, { state: id });
  };
  console.log(category.posts);

  const renderCategory = () => {
    const author_name = category.author ? category.author.username : '-';
    const date = new Date(category.updateAt);
    console.log(category.posts);

    return (
      <div className={styles.categoryContainer}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
        <div className={styles.imageContainer}>
          <img src={category.image} width={200} height={200} alt={category.title} />
        </div>
        <h4 className="h4">{category.title}</h4>
        <p className="lead">{category.description}</p>
        <div className="align-self-end float-end ps-2">
          <div className="col input-group input-group-sm">
            <div className="input-group-text">
              <i className="bi bi-person-circle pb-1 pe-2"></i>
              <small>{author_name}</small>
            </div>
            {(
              (userRole === 'ADMIN' || userRole === 'MODERATOR' || userRole === 'EDITOR') &&
                <div className="input-group-text"><i className="bi bi-toggle-on pb-1 pe-2"></i>
                  <small>
                    {(category.status == 'PUBLISHED') && ' Published'}
                    {(category.status == 'UNPUBLISHED') && ' Unpublished'}
                    {(category.status == 'ARCHIVED') && ' Archived'}
                    {(category.status == 'TRASHED') && ' Trashed'}
                  </small>
                </div>
            )}
            <div className="input-group-text">
              <i className="bi bi-tags pb-1 pe-2"></i>
              <small>{date.toLocaleString()}hs.</small>
            </div>
          </div>
        </div>
        <div className="container overflow-hidden mt-3">
          <div className="row gy-5">
            {Array.from(category.posts).map((postItem: any) => (
              <MiniPostsItem
                key={`mini-post-item-${postItem.id}`}              
                title={postItem.title}
                description={postItem.description}
                image={postItem.image}
                status={postItem.status}
                post_author_id={postItem.author.id}
                post_author_username={postItem.author.username}
                post_author_status={postItem.author.status}
                updateAt={postItem.updateAt}
                userRole={userRole}
                onMiniPostClick={handleMiniPostItemClick}
                id={postItem.id}
              />
            ))}
          </div>
        </div>
      </div>
    )
  };

  return (
    <div>
      {renderCategory()}
    </div>
  );
};

export default memo(Category);