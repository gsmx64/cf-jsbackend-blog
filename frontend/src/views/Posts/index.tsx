import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactPaginate from 'react-paginate';
import { AxiosResponse } from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../../services/auth.service";
import PostsService from "../../services/posts.service";
import { IPostArray, initIPostArray } from "../../interfaces/post.interface";
import Navbar from "../../components/Navbar";
import Posts from "../../components/Posts";
import styles from "./Posts.module.css";
import { AuthResponse } from "../../interfaces/auth.interface";
/*
// Implementation of Zustand with Axios
import usePostsStore from "../../state/posts.store";

interface Error {
  err: unknown;
  isError: boolean;
  error?: Error;
  stack?: Error;
  message: string;
  toString(): string;
}

interface IUsePostsStore {
  postsData: IPost;
  postsIsLoading: boolean;
  postsError: Error | null | unknown;
  fetchPosts: (query: string | null) => void;
}
*/

const PostsView = (): React.JSX.Element => {
  const [posts, setPosts] = useState<IPostArray>(initIPostArray);
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

  /*
  // Implementation of Zustand with Axios
  const { postsData, postsIsLoading, postsError, fetchPosts }: IUsePostsStore = usePostsStore();
  const posts = postsData;
  */

  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

  useEffect(() => {
    fetchPosts();
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const fetchPosts = (query: string | null = null) => {
      return query ?
        PostsService.search(query)
        .then((response: AxiosResponse) => {
          setPosts(response.data);
          //console.log(JSON.stringify(response.data.data));
        })
        :
        PostsService.getAll()
        .then((response: AxiosResponse) => {
          setPosts(response.data);
          //console.log(JSON.stringify(response.data.data));
        })
  }

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
    fetchPosts(`?search=${term}`);
  }

  const handlePageClick = useCallback(({ selected }: any) => {
    fetchPosts(`?search=${searchTerm}&page=${selected}`);
  }, [searchTerm, fetchPosts]);

  const renderPosts = () => {
    return (
      <div>
          {/*<button onClick={() => setIsToggle(!isToggle)}>{isToggle ? 'ON' : 'OFF'}</button>*/}
          <Posts
            searchTerm={searchTerm}
            posts={posts}
            userRole={
              (currentUser?.user?.role != null) &&
              (currentUser.user.role)}
          />
          <ReactPaginate
              className={styles.pagination}
              nextClassName={styles.next}
              previousClassName={styles.previous}
              pageClassName={styles.page}
              activeClassName={styles.activePage}
              disabledClassName={styles.disabledPage}
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={posts.meta.totalPages}
              previousLabel="<"
              renderOnZeroPageCount={null}
          />
      </div>
    );
  }

  return (
    <div className="container">
      {<Navbar
        onSearch={handleNavbarSearch}
        ref={containerRef}
        />}
      {renderPosts()}
    </div> 
  );
};

export default PostsView;