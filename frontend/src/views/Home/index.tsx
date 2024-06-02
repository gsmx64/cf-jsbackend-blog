import PostsView from "../Posts";


const HomeView = ({searchTerm}: any) => {
  return (
    <>
      <PostsView searchTerm={searchTerm} />
    </>
  );
};

export default HomeView;