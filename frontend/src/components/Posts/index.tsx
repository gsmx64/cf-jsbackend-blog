import React from "react";
import PostItem from "./components/PostItem";
import data from '../../data/posts.json';

interface PostsProps {
    key: string,
    image: string,
    name: string,
    content: string,
}
/*export type Props = {
    children?: React.ReactNode;
};
*/

const { _embedded: { posts }} = data;

const Posts: React.FC<PostsProps> = (props: PostsProps) => {
    const postsComponent = posts.map((postItem) => (
        <PostItem
            key={`post-item-${postItem.id}`}
            image={postItem.image}
            name={postItem.name}
            content={postItem.content}
        />
    ));
    return (
        <div>
            Posts
            {postsComponent}
        </div>
    );
};

export default Posts;