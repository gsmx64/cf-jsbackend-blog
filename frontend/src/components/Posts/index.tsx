import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PostItem from "./components/PostItem";


const Posts = ({searchTerm, posts, userRole}: any): React.JSX.Element => {
  const navigate = useNavigate();

  const handlePostItemClick = (id: string) => {
      navigate(`/post/${id}`, { state: id });
  };

  const renderPosts = () => {
    let postsFiltered = posts;

    if(searchTerm.length > 0) {
      let postsFiltered = (posts: any) => {
        Array.from(posts.data).filter(
        (item: any) => item.title
                        .toLocaleLowerCase()
                        .includes(searchTerm)
        );
        return Object.setPrototypeOf(postsFiltered, Object.prototype);
      }
    }
    //console.log(postItem?.author?);

    return Array.from(postsFiltered.data).map((postItem: any) => (
      <PostItem
        key={`post-item-${postItem.id}`}
        image={postItem.image}
        title={postItem.title}
        content={postItem.content}
        status={postItem.status}
        author_id={postItem?.author?.id}
        author_username={postItem?.author?.username}
        author_status={postItem?.author?.status}
        category={postItem?.category?.title}
        updateAt={postItem.updateAt}
        userRole={userRole}
        onPostClick={handlePostItemClick}
        id={postItem.id}
      />
    ));
  }

  return (
    <div className="container mt-3">
      <div className="font-weight-bold">
        <h4>Posts</h4>
      </div>
      <div>
        {renderPosts()}
      </div>
    </div>
  );
};

export default memo(Posts);