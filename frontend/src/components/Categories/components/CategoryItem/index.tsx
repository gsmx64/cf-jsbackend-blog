import { Link } from "react-router-dom";

import styles from './CategoryItem.module.css';
import BootstrapLink from "../../../BootstrapLink";


const CategoryItem = ({ category, postsCount, currentUser, onCategoryClick }: any) => {
  const handleSeeMoreClick = (event: any) => {
    event.stopPropagation();
    onCategoryClick(category?.id);
  };

  const date = new Date(category?.updateAt);

  return (
    <div className={styles.categoryContainer}>
      <BootstrapLink />
      <div className={styles.imageContainer}>
        <img src={category?.image} width={200} height={200} alt={category?.title} className="rounded" />
      </div>
      <div className={styles.categoryContentContainer}>
        <h4 className="h4">{category?.title}</h4>
        <p className="lead">{category?.description}</p>
        <div className="d-flex">
          <div className="align-self-start">
            <button onClick={handleSeeMoreClick} className="btn btn-outline-secondary">
              Ver mas
            </button>
          </div>
          <div className="align-self-end float-end ps-2">
            <div className="col input-group input-group-sm">
              <div className="input-group-text">
                <i className="bi bi-file-earmark-post pb-1 pe-2"></i>
                <small>{postsCount}</small>
              </div>
              <div className="input-group-text">
                <i className="bi bi-person-circle pb-1 pe-2"></i>
                <Link to={`/user/${category?.author.id}`} className="">
                  <small>{category?.author?.username}</small>
                  {(category?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
                </Link>
              </div>
              {(
                (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR' || currentUser?.role === 'EDITOR') &&
                  <div className="input-group-text"><i className="bi bi-toggle-on pb-1 pe-2"></i>
                    <small>
                      {(category?.status == 'PUBLISHED') && ' Published'}
                      {(category?.status == 'UNPUBLISHED') && ' Unpublished'}
                      {(category?.status == 'ARCHIVED') && ' Archived'}
                      {(category?.status == 'TRASHED') && ' Trashed'}
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

export default CategoryItem;