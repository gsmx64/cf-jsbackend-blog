import PostsView from "../Posts";
import SetupView from "../Setup";


const HomeView = ({ currentUser, settings, searchTerm }: any) => {
  return (
    (settings?.setup === null) ?
    (
      <SetupView />
    ) : (
      <PostsView
      currentUser={currentUser}
      settings={settings}
      searchTerm={searchTerm}
    />
    )
  );
};

export default HomeView;