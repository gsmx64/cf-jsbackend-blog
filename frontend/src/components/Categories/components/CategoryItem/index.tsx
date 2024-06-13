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
          <div className="align-self-end">
            <div className="btn-group align-self-end" role="group">
              <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                <i className="bi bi-file-earmark-post pb-1 pe-2"></i>
                Posts: {postsCount}
              </span>
              <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                <i className="bi bi-person-circle pb-1 pe-2"></i>
                <Link to={`/user/${category?.author.id}`} style={{color: 'inherit'}}>
                  <small>{category?.author?.username}</small>
                  {(category?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
                </Link>
              </span>
              {(
                (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR' || currentUser?.role === 'EDITOR') &&
                  <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                    <i className="bi bi-toggle-on pb-1 pe-1"></i>
                    {(category?.status == 'PUBLISHED') && ' Published'}
                    {(category?.status == 'UNPUBLISHED') && ' Unpublished'}
                    {(category?.status == 'ARCHIVED') && ' Archived'}
                    {(category?.status == 'TRASHED') && ' Trashed'}
                  </span>
              )}
              <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                <i className="bi bi-calendar2-date pb-1 pe-2"></i>
                {date.toLocaleString()}hs.
              </span>
            </div>
          </div>
        </div>  
        <div className="mt-4">
          <button onClick={handleSeeMoreClick} className="btn btn-outline-secondary">
            Ver mas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;