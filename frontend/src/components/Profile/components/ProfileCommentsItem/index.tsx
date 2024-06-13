import { Link } from "react-router-dom";


const ProfileCommentsItem = ({ comments }: any) => {
  var formatDate = (currentDate: string) => {
    var new_date = new Date(currentDate);
    return currentDate ? `${new_date.toLocaleString()}hs.` : '';
  }

  return (
    <div className="col-sm-6 mb-3">
      <div className="border rounded-3 pt-2 pb-2 ps-2 pe-2 h-100">
        <div className="card-body">
          <h6 className="d-flex align-items-center mb-3">
            <i className="material-icons text-info pe-1">Comments</i>Last 5
          </h6>
          {
            (comments.data?.length > 0) ? 
              Array.from(comments.data).map((comment: any) => (
                <div key={comment.id} className="border rounded-3 pt-2 pb-2 ps-2 pe-2 mb-3">
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
              )
            ) : (<small>No comments found.</small>)
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileCommentsItem;