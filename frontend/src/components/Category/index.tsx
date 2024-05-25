import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import MiniPostsItem from "./components/MiniPostsItem";
import Loading from "../Loading";
import styles from "./Category.module.css";
import BootstrapLink from "../BootstrapLink";
import Alerts from "../Alerts";


const Category = ({data, loading, errorMessage, userRole}: any) => {
  const navigate = useNavigate();

  const handleMiniPostItemClick = (id: string) => {
      navigate(`/post/${id}`, { state: id });
  };

  const currentData = data;
  const date = new Date(currentData?.updateAt);

  return (
    <>
      {currentData && loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.categoryContainer}>
            <BootstrapLink />
            <div className={styles.imageContainer}>
              <img src={currentData.image} width={200} height={200} alt={currentData.title} />
            </div>
            <h4 className="h4">{currentData.title}</h4>
            <p className="lead">{currentData.description}</p>
            <div className="align-self-end float-end ps-1">
              <div className="col input-group input-group-sm">
                <div className="input-group-text">
                  <i className="bi bi-person-circle pb-1"></i>
                  <Link to={`/user/${currentData.author.id}`} className="badge">
                    <span className="text-info font-weight-bold">{currentData.author.username}</span>
                    {(currentData.author.status === 'BANNED') && <i className="bi bi-ban"></i>}
                  </Link>
                </div>
                {(
                  (userRole === 'ADMIN' || userRole === 'MODERATOR' || userRole === 'EDITOR') &&
                    <div className="input-group-text"><i className="bi bi-toggle-on pb-1 pe-1"></i>
                      <small>
                        {(currentData.status == 'PUBLISHED') && ' Published'}
                        {(currentData.status == 'UNPUBLISHED') && ' Unpublished'}
                        {(currentData.status == 'ARCHIVED') && ' Archived'}
                        {(currentData.status == 'TRASHED') && ' Trashed'}
                      </small>
                    </div>
                )}
                <div className="input-group-text">
                  <i className="bi bi-tags pb-1 pe-1"></i>
                  <small>{date.toLocaleString()}hs.</small>
                </div>
              </div>
            </div>
            <div className="container overflow-hidden mt-3">
              <div className="row gy-5">
                <div className="align-self-end float-end pt-4">
                  <h4 className="d-flex justify-content-end">
                    <i className="text-info pe-1">Posts</i>
                  </h4>
                </div>
                {!currentData.posts ? (
                  <div className="justify-content-center pt-20">
                    <p>No posts found!</p>
                  </div>
                ) : (
                  <>
                    {currentData.posts?.map((categoryPostItem: any) => {
                      return (
                        <MiniPostsItem
                          key={`mini-post-item-${categoryPostItem.id}`}
                          title={categoryPostItem.title}
                          description={categoryPostItem.description}
                          image={categoryPostItem.image}
                          status={categoryPostItem.status}
                          post_author_id={categoryPostItem.author?.id}
                          post_author_username={categoryPostItem.author?.username}
                          post_author_status={categoryPostItem.author?.status}
                          updateAt={categoryPostItem.updateAt}
                          userRole={userRole}
                          onMiniPostClick={handleMiniPostItemClick}
                          id={categoryPostItem.id}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
          <Alerts
            alertMessage={''}
            errorMessage={errorMessage}
          />
        </>
      )}
    </>
  );
};

export default Category;