import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { DEFAULT_NO_AVATAR_MEDIUM } from "../../constants/defaultConstants";
import { ICommentArray } from "../../interfaces/comment.interface";


interface CommentsProps {
  comments: ICommentArray[] | any;
}

const Comments = ({ comments }: CommentsProps) => {
  const commentsData: ICommentArray[] = Array.from(comments) || [];
  var formatDate = (currentDate: string) => {
    var new_date = new Date(currentDate);
    return currentDate ? `${new_date.toLocaleString()}hs.` : '';
  }

  return (
    <div className="card-body">
      <h6 className="d-flex justify-content-end mb-3">
        <i className="material-icons text-info mr-2 pe-1">Comments</i>
      </h6>
      {
        (
          (commentsData as ICommentArray[]).length === 0) ? (
            <div className="mt-2 mb-4">
              <small>No comments found.</small>
            </div>
          ) : (
            (commentsData).map((comment: any, idx: number) => (
              <div key={idx} className="card mt-2">
                <div className="card-header">
                  <div className="float-start">
                    <span className="pe-1" style={{fontSize:12}}>Comment by: </span>
                    <img
                      src={comment.author?.avatar ? comment.author?.avatar : DEFAULT_NO_AVATAR_MEDIUM}
                      alt={comment.author?.username}
                      className="rounded-circle" width="26" />
                    <Link
                      to={`/user/${comment.author?.id}`}
                      className="badge"
                      >
                      <span className="text-info">{comment.author?.username}</span>
                      {(comment.author?.status === 'BANNED') && <i className="bi bi-ban"></i>}
                    </Link>
                    </div>
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p className="card-text" style={{fontSize:12}}>
                      {comment.message}
                    </p>  
                    <footer className="blockquote-footer float-end">
                      <span style={{fontSize:11}}>{formatDate(comment.updateAt)}</span>
                    </footer>
                  </blockquote>
                </div>
              </div>
            )
          )
        )
      }
    </div>
  );
}

export default Comments;