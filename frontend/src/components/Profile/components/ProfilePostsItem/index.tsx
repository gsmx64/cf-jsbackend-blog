import { Link } from "react-router-dom";


const ProfilePostsItem = ({ posts }: any) => {
  var formatDate = (currentDate: string) => {
    var new_date = new Date(currentDate);
    return currentDate ? `${new_date.toLocaleString()}hs.` : '';
  }

  return (
    <div className="col-sm-6 mb-3">
      <div className="border rounded-3 pt-2 pb-2 ps-2 pe-2 h-100">
        <div className="card-body">
          <h6 className="d-flex align-items-center mb-3">
            <i className="material-icons text-info pe-1">Posts</i>Last 5
          </h6>
          <div className="list-group">
            {
              (posts.data?.length > 0) ? 
                Array.from(posts.data).map((post: any) => (
                  <div key={post.id} className="mb-3">                
                    <div className="border rounded-3 pt-2 pb-2 ps-2 pe-2">
                      <div className="d-flex w-100 justify-content-between">
                        <small className="">Author: {post.author.username}</small>
                        <small className="">{formatDate(post.updateAt)}</small>
                      </div>
                      <div className="mb-1">
                        <Link to={`/post/${post.id}`} style={{color: 'inherit'}}>
                          <h4 className="mb-1">Post: {post.title}</h4>
                        </Link>
                      </div>
                      <small className="">Category: {post.category.title}</small>
                    </div>
                  </div>
                )
              ) : (<small>No posts found.</small>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostsItem;