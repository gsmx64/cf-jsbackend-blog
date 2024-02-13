import React from "react";//, { useState }
import { useNavigate } from "react-router-dom";

import CategoryItem from "./components/CategoryItem";


const Categories = ({categories, userRole}: any): React.JSX.Element => {
  const navigate = useNavigate();

  const handleCategoryItemClick = (id: string) => {
      navigate(`/category/${id}`, { state: id });
  };

  const renderCategories = () => {

    return Array.from(categories.data).map((categoryItem: any) => (
      <CategoryItem
        key={`category-item-${categoryItem.id}`}
        title={categoryItem.title}
        description={categoryItem.description}
        image={categoryItem.image}
        status={categoryItem.status}
        author={categoryItem.author.username}        
        updateAt={categoryItem.updateAt}
        postsCount={categories.meta.totalItems}
        userRole={userRole}
        onCategoryClick={handleCategoryItemClick}
        id={categoryItem.id}
      />
    ));
  }

  return (
    <div className="container mt-3">
      <div className="font-weight-bold">
        <h4>Categories</h4>
      </div>
      <div>
        {renderCategories()}
      </div>
    </div>
  );
};

export default Categories;