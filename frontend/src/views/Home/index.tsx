import React, { useState, useEffect } from 'react';//, ChangeEvent

import PostsService from '../../services/posts.service';
import IPost from '../../interfaces/post.interface';
import Navbar from '../../components/Navbar';
import Posts from '../../components/Posts';


const Home = (): React.JSX.Element => {
  const [posts, setPosts] = useState<Array<IPost>>([]);

  const [searchTerm, setSearchTerm] = useState<any>('');

  useEffect(() => {
    PostsService.getAll()
      .then((response: any) => { //AxiosResponse<IPost[]>
        setPosts(response.data.data);
        //console.log(JSON.stringify(response.data.data));
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term);
  }

  return (
    <div className="container">
      {<Navbar
        onSearch={handleNavbarSearch}
      />}
      {<Posts
        searchTerm={searchTerm}
        posts={posts}
      />}
    </div>
  );
};

export default Home;