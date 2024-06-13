import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PanelCategoryItem from "./components/PanelCategoryItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";
import BootstrapLink from "../BootstrapLink";


const PanelCategories = ({data, currentPage, setCurrentPage, totalPages, alertMessage,
  errorMessage, loading, searchTerm, currentUser, onUpdateStatusCategory, onDeleteCategory}: any) => {
  const navigate = useNavigate();

  const handleCategoryItemUpdateStatusCategory = (id: string, status: string, title: string) => {
    onUpdateStatusCategory(id, status, title);
  };

  const handleCategoryEditCategory = (id: string) => {
    navigate(`/edit-category/${id}`, { state: id });
  };

  const handleCategoryItemDeleteCategory = (id: string, title: string) => {
    const shouldRemove = confirm(`Are you sure you want to delete "${title}"?`);
  
    if (shouldRemove) {
      onDeleteCategory(id, title);
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
                <BootstrapLink />
                <table className="table table-striped table-hover align-middle">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Category Title</th>
                      <th scope="col">Author</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Updated Date</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((category: any, idx: number) => {
                      if (searchTerm !== '') {
                        if (
                          !category.title.toLowerCase().includes(searchTerm) &&
                          !category.description.toLowerCase().includes(searchTerm)
                        ) {
                          return '';
                        }
                      }

                      return (
                        <PanelCategoryItem
                          key={`category-item-${category.id}`}
                          idx={idx}
                          //row_state={(idx % 2) ? 'odd' : 'even'}
                          category={category}
                          onCategoryItemUpdateStatusCategory={handleCategoryItemUpdateStatusCategory}
                          onCategoryItemEditCategory={handleCategoryEditCategory}
                          onCategoryItemDeleteCategory={handleCategoryItemDeleteCategory}
                          currentUser={currentUser}
                        />
                      );
                    })}
                  </tbody>
                </table>
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

export default PanelCategories;