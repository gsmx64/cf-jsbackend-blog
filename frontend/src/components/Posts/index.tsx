import React from "react";//, { useState }
import { useNavigate } from "react-router-dom";

import PostItem from "./components/PostItem";
import styles from "./Posts.module.css";


const Posts = ({searchTerm, posts}: any): React.JSX.Element => {
    const navigate = useNavigate();

    const handlePostItemClick = (id: any) => {
        navigate(`/post/view/${id}`);
    };

    const renderPosts = () => {
        let postsFiltered = posts;

        if(searchTerm.length > 0) {
            postsFiltered = postsFiltered.filter(
                (item: any) => item.title.toLocaleLowerCase()
                                   .includes(searchTerm)
            );
        }

        return postsFiltered.map((postItem: any) => (
            <PostItem
                key={`post-item-${postItem.id}`}
                image={postItem.image}
                title={postItem.title}
                content={postItem.content}
                status={postItem.status}
                author={postItem.author.username}
                category={postItem.category.title}
                updateAt={postItem.updateAt}
                onPostClick={handlePostItemClick}
                id={postItem.id}
            />
        ));
    }

    return (
        <div>
            <div className={styles.postsContainerTitleText}>
                Posts
            </div>
            <div>
                {renderPosts()}
            </div>
        </div>
    );
};

export default Posts;