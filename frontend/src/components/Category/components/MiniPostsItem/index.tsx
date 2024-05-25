import BootstrapLink from '../../../BootstrapLink';
import styles from './MiniPostsItem.module.css';
import { Link } from "react-router-dom";


const MiniPostsItem = ({ id, title, description, image, status, post_author_id, post_author_username,
  post_author_status, updateAt, userRole, onMiniPostClick }: any) => {
  
  const handleSeeMoreClick = (event: any) => {
    event.stopPropagation();
    onMiniPostClick(id);
  };

  const date = new Date(updateAt);

  return (
    <div className="col-6">
      <div className="p-3 border bg-light">
        <BootstrapLink />
        <div className={styles.imageContainer}>
          <img src={image} width={200} height={200} alt={title} className="rounded" />
        </div>
        <div className={styles.postsContentContainer}>
          <h4 className="h4">{title}</h4>
          <p className="lead">{description}</p>
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
                  <Link to={`/user/${post_author_id}`} className="badge">
                  <span className="text-info font-weight-bold">{post_author_username}</span>
                    {(post_author_status === 'BANNED') && <i className="bi bi-ban"></i>}
                  </Link>
                </div>
                {(
                  (userRole === 'ADMIN' || userRole === 'MODERATOR' || userRole === 'EDITOR') &&
                    <div className="input-group-text">
                      <i className="bi bi-toggle-on pb-1 pe-2"></i>
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
    </div>
  );
};

export default MiniPostsItem;