import PostsView from "../Posts";


const HomeView = (): React.JSX.Element => {
  return (
    <div className="container">
      {<PostsView />}
    </div>
  );
};

export default HomeView;