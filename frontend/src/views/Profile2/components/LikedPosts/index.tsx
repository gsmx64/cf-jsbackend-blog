import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PostItem from "../../../../components/Posts/components/PostItem";

const LikedPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventsDetails = async () => {
            try {
                setIsLoading(true);
                const likedPosts = ''; //JSON.parse(localStorage.getItem()) || [];
                
                const results = [];

                for (const postId of likedPosts) {
                    const response = await fetch(`${import.meta.env.API_URL}/posts/`);
                    const data = await response.json();

                    results.push(data);
                }
                
                setPosts(results);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventsDetails();
    }, []);

    const handlePostItemClick = (postId: any) => {
        navigate(`/post/${postId}`);
    };

    if (Object.keys(error).length > 0) {
        return <div>Ha ocurrido un error</div>;
    }

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {posts.map((post, index) => (
                <PostItem 
                    key={`liked-post-item-${post.id}-${index}`}
                    title={post.title}
                    content={post.content}
                    image={post.image}
                    onPostClick={handlePostItemClick}
                    id={post.id}
                />
            ))}
        </div>
    );
};

export default LikedPosts;