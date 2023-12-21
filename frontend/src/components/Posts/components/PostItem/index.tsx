import React from "react";

const PostItem: React.FC<{}> = () => {
    return (
        <div>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>{content}</p>
        </div>
    );
};

export default PostItem;