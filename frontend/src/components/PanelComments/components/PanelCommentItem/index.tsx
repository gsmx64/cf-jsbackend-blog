import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { DEFAULT_NO_AVATAR_TINY } from "../../../../constants/defaultConstants";


const PanelCommentItem = ({ idx, comment, currentUser, onCommentItemEditComment,
  onCommentItemDeleteComment }: any) => {
  const [messageBox, setMessageBox] = useState(comment?.message);

  const handleCommentItemEditComment = (event: any) => {
    event.stopPropagation();
    onCommentItemEditComment(comment?.id);
  };

  const handleCommentItemDeleteComment = (event: any) => {
    event.stopPropagation();
    onCommentItemDeleteComment(comment?.id, comment?.author?.username);
  };

  const createAtDate = new Date(comment?.createAt);
  const updateAtDate = new Date(comment?.updateAt);

  useEffect(() => {
    setMessageBox(comment?.message);
  }, [comment?.message]);

  return (
    <tr>
      <th scope="row">{(idx+1)}</th>
      <td>
        <Link to={`/user/${comment?.author?.id}`}>
          <img src={comment?.author?.avatar ? comment?.author?.avatar : DEFAULT_NO_AVATAR_TINY} width={38} height={38} alt={comment?.author?.username} className="rounded" />
          <span className="ms-2">
            {comment?.author?.username}
            {(comment?.author?.status === 'BANNED') && <i className="bi bi-ban link-danger"></i>}
          </span>
        </Link>
      </td>
      <td>
        <Link to={`/post/${comment?.post?.id}`}>
          {comment?.post?.title}
        </Link>
      </td>
      <td>
        <textarea
          id={`comment-textarea-${comment?.id}`}
          defaultValue={messageBox}
          className="form-control"
          rows={1}
        />
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
                onClick={handleCommentItemEditComment}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit Comment"
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="btn btn-outline-secondary ms-1"
                onClick={handleCommentItemDeleteComment}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Delete Comment"
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

export default PanelCommentItem;