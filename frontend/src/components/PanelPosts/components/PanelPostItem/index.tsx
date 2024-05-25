import { useState } from "react";
import { Link } from "react-router-dom";
import BootstrapLink from "../../../BootstrapLink";


const PanelPostItem = ({ id, title, image, status, author_id, author_username, author_avatar, author_status, category_id,
  category_title, createAt, updateAt, row_state, userRole, onPostItemUpdateStatusPost, onPostItemEditPost, onPostItemDeletePost }: any) => {
  const [selectedStatus, setSelectedStatus] = useState(status);
  
  const handlePostItemUpdateStatusPost = (event: any) => {
    event.stopPropagation();
    setSelectedStatus(event.target.value);
    onPostItemUpdateStatusPost(id, event.target.value);
  };

  const handlePostItemEditPost = (event: any) => {
    event.stopPropagation();
    onPostItemEditPost(id);
  };

  const handlePostItemDeletePost = (event: any) => {
    event.stopPropagation();
    onPostItemDeletePost(id, title);
  };

  const createAtDate = new Date(createAt);
  const updateAtDate = new Date(updateAt);

  return (
    <div className={"item-list row " + row_state}>
      <BootstrapLink />
      <div className="col">
        <img src={image} width={38} height={38} alt={title} className="rounded" />
      </div>
      <div className="col">
        <Link to={`/post/${id}`}>
          {title}
        </Link>
      </div>
      <div className="col">
        <Link to={`/category/${category_id}`}>
          {category_title}
        </Link>
      </div>
      <div className="col">
        <Link to={`/user/${author_id}`}>
          <img src={author_avatar} width={38} height={38} alt={author_username} className="rounded" />
          <span className="ms-2">
            {author_username}
            {(author_status === 'BANNED') && <i className="bi bi-ban"></i>}
          </span>
        </Link>
      </div>
      <div className="col">
        {(
          (userRole === 'ADMIN' || userRole === 'MODERATOR' || userRole === 'EDITOR') &&
          <>
            <select
              id={`post-select-status-${id}`}
              value={selectedStatus}
              onChange={event => handlePostItemUpdateStatusPost(event)}
              className="form-select form-select-sm pe-14" style={{minWidth:124 }}
            >
              <option value="PUBLISHED">Published</option>
              <option value="UNPUBLISHED">Unpublished</option>
              <option value="ARCHIVED">Archived</option>
              <option value="TRASHED">Trashed</option>
            </select>
          </>
        )}
      </div>
      <div className="col">
        <span>{createAtDate.toLocaleString()}hs.</span>
      </div>
      <div className="col">
        <span>{updateAtDate.toLocaleString()}hs.</span>
      </div>
      <div className="col">
        <button className="btn btn-outline-secondary" onClick={handlePostItemEditPost}>
          <i className="bi bi-pencil-square"></i>
        </button>
        <button className="btn btn-outline-secondary ms-1" onClick={handlePostItemDeletePost}>
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default PanelPostItem;