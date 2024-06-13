import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MiniPostsItem from "./components/MiniPostsItem";
import Loading from "../Loading";
import styles from "./Category.module.css";
import BootstrapLink from "../BootstrapLink";
import Alerts from "../Alerts";
import ICategory from "../../interfaces/category.interface";
import IUser from "../../interfaces/user.interface";
import ISettings from "../../interfaces/settings.interface";
import { IPostArray } from "../../interfaces/post.interface";


interface CategoryProps {
  category: ICategory;
  loading: boolean;
  errorMessage: Error | string | unknown;
  currentUser: IUser | undefined;
  settings: ISettings;
  setSearchTerm: (term: string) => void;
}

const Category = ({category, loading, errorMessage, setSearchTerm,
  currentUser, /*settings,*/}: CategoryProps) => {
  const navigate = useNavigate();

  const handleMiniPostItemClick = (id: string) => {
      navigate(`/post/${id}`, { state: id });
  };

  const date = new Date(category?.updateAt);
  loading = (category?.id === '') ? true : loading;
  const categoryPosts = category?.posts || [];
  setSearchTerm('');

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.categoryContainer}>
            <BootstrapLink />
            <div className={styles.imageContainer}>
              <img
                src={category?.image}
                width={200}
                height={200}
                alt={category?.title}
                className="rounded"
              />
            </div>
            <h4 className="h4">{category?.title}</h4>
            <p className="lead">{category?.description}</p>
            <div className="align-self-end">
              <div className="btn-group align-self-end" role="group">
                <span className="btn btn-outline-secondary" style={{whiteSpace: 'nowrap'}}>
                  
                  <Link to={`/user/${category?.author?.id}`} style={{color: 'inherit'}}>
                    <i className="bi bi-person-circle pb-1 pe-2"></i>
                    {category?.author?.username}
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
                  <i className="bi bi-tags pb-1 pe-1"></i>
                  <small>{date.toLocaleString()}hs.</small>
                </span>
              </div>
            </div>
            <div className="container overflow-hidden mt-3">
              <div className="row gy-5">
                <div className="align-self-end float-end pt-4">
                  <h4 className="d-flex justify-content-end">
                    <i className="text-info pe-1">Posts</i>
                  </h4>
                </div>
                {((categoryPosts as IPostArray[]).length === 0) ? (
                  <div className="justify-content-center pt-20">
                    <p>No posts found!</p>
                  </div>
                ) : (
                  <>
                    {(categoryPosts as IPostArray[]).map((categoryPost: any) => {
                      return (
                        <MiniPostsItem
                          key={`mini-post-item-${categoryPost?.id}`}
                          post={categoryPost}
                          onMiniPostClick={handleMiniPostItemClick}
                          currentUser={currentUser}
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