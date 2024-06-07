import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CategoryItem from "./components/CategoryItem";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Alerts from "../Alerts";


const Categories = ({data, currentPage, setCurrentPage, totalPages,
  errorMessage, loading, searchTerm, userRole}: any) => {
  const navigate = useNavigate();
  let filteredPosts = 0;

  const handleCategoryItemClick = (id: string) => {
    navigate(`/category/${id}`, { state: id });
  };

  const currentData = Array.from(data);

  return (
    <>
      <div className="font-weight-bold">
        <h4>Categories</h4>
      </div>
      <div>
        {
          currentData && loading ? (
            <Loading />
          ) : (
            <>
              {!currentData ? (
                <div className="justify-content-center pt-20">
                  <p>No categories found!</p>
                </div>
              ) : (
                <div className="justify-content-center">
                  {currentData?.map((categoryItem: any) => {
                    if (searchTerm !== '') {
                      if (
                        !categoryItem.title.toLowerCase().includes(searchTerm) &&
                        !categoryItem.description.toLowerCase().includes(searchTerm)
                      ) {
                        filteredPosts++;
                        return;
                      }
                    }

                    return (
                      <CategoryItem
                        key={`category-item-${categoryItem.id}`}
                        title={categoryItem.title}
                        image={categoryItem.image}
                        description={categoryItem.description}
                        status={categoryItem.status}
                        author={categoryItem.author}        
                        updateAt={categoryItem.updateAt}
                        postsCount={categoryItem.posts.length}
                        userRole={userRole}
                        onCategoryClick={handleCategoryItemClick}
                        id={categoryItem.id}
                        />
                      );
                  })}
                </div>
              )}
              <Pagination
                totalPages={totalPages-filteredPosts}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
              {(currentData.length === filteredPosts) && (
                <div className="justify-content-center pt-20">
                  <p>No categories found!</p>
                </div>
              )}
              <Alerts
                alertMessage={''}
                errorMessage={errorMessage}
              />
            </>
          )
        }
      </div>
    </>
  );
};

export default Categories;