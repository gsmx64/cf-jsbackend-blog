import React from "react";

import styles from './PostItem.module.css';


const PostItem = ({ id, title, image, content, status, author, category, updateAt, onPostClick }: any): React.JSX.Element => {
    const handleSeeMoreClick = (evt: any) => {
        evt.stopPropagation();
        onPostClick(id);
    };

    const date = new Date(updateAt);

    return (
        
        <div className={styles.postContainer}>
            <div className={styles.imageContainer}>
                {/*<img src={isEventLiked ? HearthFilled : HearthUnfilled} alt="Hearth button" className={styles.hearthImage} onClick={handleHearthClick} />*/}
                <img src={image} width={200} height={200} alt={title} />
            </div>
            <div className={styles.postContentContainer}>
                <h4 className={styles.postTitle}>{title}</h4>
                <p className={styles.postContent}>{content}</p>
                <div className={styles.seeMoreBtnInfoContainer}>
                    <div className={styles.seeMoreBtnContainer}>
                        <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn}>
                            Ver mas
                        </button>
                    </div>
                    <div className={styles.postInfoContainer}>
                        <p className={styles.postCategory}>Categoría: {category}</p>
                        <p className={styles.postAuthor}>Autor: {author}</p>
                        {(status == 'PUBLISHED') && <p className={styles.postStatus}>Estado: Publicado</p>}
                        {(status == 'UNPUBLISHED') && <p className={styles.postStatus}>Estado: Despublicado</p>}
                        {(status == 'ARCHIVED') && <p className={styles.postStatus}>Estado: Archivado</p>}
                        {(status == 'TRASHED') && <p className={styles.postStatus}>Estado: En Papelera</p>}
                        <p className={styles.postUpdateAt}>Actualizado: {date.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;