import { memo } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PanelCategoryItem from "./components/PanelCategoryItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import { DEFAULT_NO_AVATAR_TINY } from "../../constants/defaultConstants";


const PanelCategories = ({data, currentPage, setCurrentPage, totalPages, alertMessage,
  errorMessage, loading, searchTerm, userRole, onUpdateStatusCategory, onDeleteCategory}: any) => {
  const navigate = useNavigate();

  const handleCategoryItemUpdateStatusCategory = (id: string, status: string) => {
    onUpdateStatusCategory(id, status);
  };

  const handleCategoryEditCategory = (id: string) => {
    navigate(`/edit-category/${id}`, { state: id });
  };

  const handleCategoryItemDeleteCategory = (id: string, title: string) => {
    const shouldRemove = confirm(`Are you sure you want to delete ${title}?`);
  
    if (shouldRemove) {
      onDeleteCategory(id);
    }
  };

  const currentData = Array.from(data);

  return (
    <>
      <div className="container mt-3">
        <div className="font-weight-bold">
          <h4>Categories</h4>
        </div>
        {currentData && loading ? (
          <Loading />
        ) : (
          <>
            {!currentData ? (
              <div className="justify-content-center pt-20">
                <p>No posts found!</p>
              </div>
            ) : (
              <div className="container-fluid">
                <div className="row border-bottom">
                  <div className="col">Image</div>
                  <div className="col">Post Title</div>
                  <div className="col">Category</div>
                  <div className="col">Author</div>
                  <div className="col">Status</div>
                  <div className="col">Created Date</div>
                  <div className="col">Updated Date</div>
                  <div className="col"></div>
                </div>
                {currentData?.map((categoryItem: any, idx: number) => {
                  if (searchTerm !== '') {
                    if (
                      !categoryItem.title.toLowerCase().includes(searchTerm) &&
                      !categoryItem.description.toLowerCase().includes(searchTerm)
                    ) {
                      return '';
                    }
                  }

                  return (
                    <PanelCategoryItem
                      key={`category-item-${categoryItem.id}`}
                      row_state={(idx % 2) ? 'odd' : 'even'}
                      title={categoryItem.title}
                      image={categoryItem.image}
                      content={categoryItem.content}
                      status={categoryItem.status}
                      author_id={categoryItem?.author?.id}
                      author_username={categoryItem?.author?.username}
                      author_avatar={categoryItem?.author?.avatar ? categoryItem?.author?.avatar : DEFAULT_NO_AVATAR_TINY}
                      author_status={categoryItem?.author?.status}
                      createAt={categoryItem.createAt}
                      updateAt={categoryItem.updateAt}
                      userRole={userRole}
                      onCategoryItemUpdateStatusCategory={handleCategoryItemUpdateStatusCategory}
                      onCategoryItemEditCategory={handleCategoryEditCategory}
                      onCategoryItemDeleteCategory={handleCategoryItemDeleteCategory}
                      id={categoryItem.id}
                    />
                  );
                })}
              </div>
            )}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <Alerts
              alertMessage={alertMessage}
              errorMessage={errorMessage}
            />
          </>            
        )}
      </div>
    </>
  );
};

export default memo(PanelCategories);