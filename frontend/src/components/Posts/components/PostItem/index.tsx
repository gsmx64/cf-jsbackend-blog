import React from "react";

interface Props {
    name: string,
    image: string,    
    content: string
}

const PostItem: React.FC<Props> = ({name, image, content}: Props) => {
    return (
        <div>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>{content}</p>
        </div>
    );
};

export default PostItem;