import PostsView from "../Posts";


const HomeView = ({ currentUser, settings, searchTerm }: any) => {
  return (
    <>
      <PostsView
        currentUser={currentUser}
        settings={settings}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default HomeView;