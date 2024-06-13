import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { DEFAULT_NO_AVATAR_TINY } from "../../../../constants/defaultConstants";


const PanelCategoryItem = ({ idx, category, currentUser,
  onCategoryItemUpdateStatusCategory, onCategoryItemEditCategory,
  onCategoryItemDeleteCategory }: any) => {
  const [selectedStatus, setSelectedStatus] = useState(category?.status);
  
  const handleCategoryItemUpdateStatusCategory = (event: any) => {
    event.stopPropagation();
    onCategoryItemUpdateStatusCategory(category?.id, event.target.value, category?.title );
  };

  const handleCategoryItemEditCategory = (event: any) => {
    event.stopPropagation();
    onCategoryItemEditCategory(category?.id);
  };

  const handleCategoryItemDeleteCategory = (event: any) => {
    event.stopPropagation();
    onCategoryItemDeleteCategory(category?.id, category?.title);
  };

  const createAtDate = new Date(category?.createAt);
  const updateAtDate = new Date(category?.updateAt);

  useEffect(() => {
    setSelectedStatus(category?.status);
  }, [category?.status]);

  return (
    <tr>
      <th scope="row">{(idx+1)}</th>
      <td>
        <img
            src={category?.image}
            width={38}
            height={38}
            alt={category?.title}
            className="rounded"
          />
      </td>
      <td>
        <Link to={`/category/${category?.id}`} style={{color: 'inherit'}}>
          {category?.title}
        </Link>
      </td>
      <td>
        <Link to={`/user/${category?.author?.id}`} style={{color: 'inherit'}}>
          <img
            src={category?.author?.avatar ? category?.author?.avatar : DEFAULT_NO_AVATAR_TINY}
            width={38}
            height={38}
            alt={category?.author?.username}
            className="rounded"
          />
          <span className="ms-2">
            {category?.author?.username}
            {(category?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
          </span>
        </Link>
      </td>
      <td>
        {(
          (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR') ?
          (
            <select
              id={`category-select-status-${category?.id}`}
              value={selectedStatus}
              onChange={event => handleCategoryItemUpdateStatusCategory(event)}
              className="form-select form-select-sm pe-14"
              style={{minWidth:124 }}
            >
              <option value="PUBLISHED">Published</option>
              <option value="UNPUBLISHED">Unpublished</option>
              <option value="ARCHIVED">Archived</option>
              <option value="TRASHED">Trashed</option>
            </select>
          ) : (
            <>
              {(selectedStatus === 'PUBLISHED') && 'Published'}
              {(selectedStatus === 'UNPUBLISHED') && 'Unpublished'}
              {(selectedStatus === 'ARCHIVED') && 'Archived'}
              {(selectedStatus === 'TRASHED') && 'Trashed'}
            </>
          )
        )}
      </td>
      <td>
        <span>{createAtDate.toLocaleString()}hs.</span>
      </td>
      <td>
        <span>{updateAtDate.toLocaleString()}hs.</span>
      </td>
      <td>
        {
          ((currentUser?.role === 'ADMIN') || (currentUser?.role === 'MODERATOR')) && (
          <>
            <button
              className="btn btn-outline-warning"
              onClick={handleCategoryItemEditCategory}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit Category"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn btn-outline-secondary ms-1"
              onClick={handleCategoryItemDeleteCategory}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete Category"
            >
              <i className="bi bi-trash3-fill"></i>
            </button>
          </>
         )
        }
      </td>
    </tr>
  );
};

export default PanelCategoryItem;