import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { DEFAULT_NO_AVATAR_TINY } from "../../../../constants/defaultConstants";


const PanelPostItem = ({ idx, post, currentUser, onPostItemUpdateStatusPost,
  onPostItemEditPost, onPostItemDeletePost }: any) => {
  const [selectedStatus, setSelectedStatus] = useState(post?.status);
  
  const handlePostItemUpdateStatusPost = (event: any) => {
    event.stopPropagation();
    setSelectedStatus(event.target.value);
    onPostItemUpdateStatusPost(post?.id, event.target.value, post?.title);
  };

  const handlePostItemEditPost = (event: any) => {
    event.stopPropagation();
    onPostItemEditPost(post?.id);
  };

  const handlePostItemDeletePost = (event: any) => {
    event.stopPropagation();
    onPostItemDeletePost(post?.id, post?.title);
  };

  const createAtDate = new Date(post?.createAt);
  const updateAtDate = new Date(post?.updateAt);

  useEffect(() => {
    setSelectedStatus(post?.status);
  }, [post?.status]);

  return (
    <tr>
      <th scope="row">{(idx+1)}</th>
      <td>
        <img
          src={post?.image}
          width={38}
          height={38}
          alt={post?.title}
          className="rounded"
        />
      </td>
      <td>
        <Link to={`/post/${post?.id}`} style={{color: 'inherit'}}>
          {post?.title}
        </Link>
      </td>
      <td>
        <Link to={`/category/${post?.category?.id}`} style={{color: 'inherit'}}>
          {post?.category?.title}
        </Link>
      </td>
      <td>
        <Link to={`/user/${post?.author?.id}`} style={{color: 'inherit'}}>
          <img
            src={post?.author?.avatar ? post?.author?.avatar : DEFAULT_NO_AVATAR_TINY}
            width={38}
            height={38}
            alt={post?.author?.username}
            className="rounded"
          />
          <span className="ms-2">
            {post?.author?.username}
            {(post?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
          </span>
        </Link>
      </td>
      <td>
      {(
        (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR' || currentUser?.role === 'EDITOR') &&
        (
          (currentUser?.role === 'ADMIN') ||
          (currentUser?.role === 'MODERATOR') ||
          (currentUser?.role === 'EDITOR' && currentUser.id === post?.author?.id)
        ) ? (
          <select
            id={`post-select-status-${post?.id}`}
            value={selectedStatus}
            onChange={event => handlePostItemUpdateStatusPost(event)}
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
          (
            (currentUser?.role === 'ADMIN') ||
            (currentUser?.role === 'MODERATOR') ||
            (currentUser?.role === 'EDITOR' && currentUser.id === post?.author?.id)
          ) && (
            <button
              className="btn btn-outline-warning"
              onClick={handlePostItemEditPost}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit Post"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          )
        }
        {
          ((currentUser?.role === 'ADMIN') || (currentUser?.role === 'MODERATOR')) && (
            <button
              className="btn btn-outline-secondary ms-1"
              onClick={handlePostItemDeletePost}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete Post"
            >
              <i className="bi bi-trash3-fill"></i>
            </button>
          )
        }
      </td>
    </tr>
  );
};

export default PanelPostItem;