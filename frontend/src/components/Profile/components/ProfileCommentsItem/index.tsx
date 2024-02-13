import React from "react";
import { Link } from "react-router-dom";


const ProfileCommentsItem = ({ comments }: any): React.JSX.Element => {
  var formatDate = (currentDate: string) => {
    var new_date = new Date(currentDate);
    return `${new_date.toLocaleString()}hs.`;
  }

  return (
    <div className="col-sm-6 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">Comments</i>Last 5</h6>
          {(comments.length === 0) ? <small>Not comments found.</small> :
            Array.from(comments.data).map((comment: any) => (
              <div key={comment.id} className="card mb-3">
                <div className="card-header">
                  <small>Comment - {formatDate(comment.updateAt)}</small>
                  <Link to={`/post/${comment.post.id}`} className="badge bg-primary rounded-pill ms-1">
                    Post
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">{comment.message}</p>
                </div>
              </div>
            ))}
        </div>    
      </div>
    </div>
  );
};

export default ProfileCommentsItem;