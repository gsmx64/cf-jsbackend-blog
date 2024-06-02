import { Link } from "react-router-dom";

import BootstrapLink from "../../../BootstrapLink";


const PanelCommentItem = ({ id, author_id, author_username, author_avatar, author_status,
  post_id, post_title, message, createAt, updateAt, row_state, userRole,
  onCommentItemEditComment, onCommentItemDeleteComment }: any) => {
  const handleCommentItemEditComment = (event: any) => {
    event.stopPropagation();
    onCommentItemEditComment(id);
  };

  const handleCommentItemDeleteComment = (event: any) => {
    event.stopPropagation();
    onCommentItemDeleteComment(id, author_username);
  };

  const createAtDate = new Date(createAt);
  const updateAtDate = new Date(updateAt);

  return (
    <div className={"item-list row " + row_state}>
      <BootstrapLink />
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
        <Link to={`/post/${post_id}`}>
          {post_title}
        </Link>
      </div>
      <div className="col-4">
        <textarea
          id={`comment-textarea-${id}`}
          defaultValue={message}
          className="form-control"
          rows={1}
        />
      </div>
      <div className="col">
        <span>{createAtDate.toLocaleString()}hs.</span>
      </div>
      <div className="col">
        <span>{updateAtDate.toLocaleString()}hs.</span>
      </div>
      <div className="col">
        {
          ((userRole === 'ADMIN') || (userRole === 'MODERATOR')) && (
            <>
              <button
                className="btn btn-outline-secondary"
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
      </div>
    </div>
  );
};

export default PanelCommentItem;