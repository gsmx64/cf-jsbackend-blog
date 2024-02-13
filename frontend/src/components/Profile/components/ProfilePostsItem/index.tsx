import React from "react";
import { Link } from "react-router-dom";



const ProfilePostsItem = ({ posts, role }: any): React.JSX.Element => {
  var formatDate = (currentDate: string) => {
    var new_date = new Date(currentDate);
    return `${new_date.toLocaleString()}hs.`;
  }

  if(role == 'BASIC') return <></>;

  return (
    <div className="col-sm-6 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2 pe-1">Posts</i>Last 5</h6>
          <div className="list-group">
            {(posts.length === 0) ? <small>Not posts found.</small> : Array.from(posts.data).map((post: any) => (
              <div key={post.id} className="mb-3">                
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">Author: {post.author.username}</small>
                    <small className="text-muted">{formatDate(post.updateAt)}</small>
                  </div>
                  <div className="mb-1">
                    <Link to={`/post/${post.id}`} className="btn">
                      <h4 className="mb-1">Post: {post.title}</h4>
                    </Link>
                  </div>
                  <small className="text-muted">Category: {post.category.title}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostsItem;