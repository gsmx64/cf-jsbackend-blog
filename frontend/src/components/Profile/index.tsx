import React from "react";

import ProfileCardItem from "./components/ProfileCardItem";
//import ProfileSocialItem from "./components/ProfileSocialItem";
import ProfileInfoItem from "./components/ProfileInfoItem";
import ProfileCommentsItem from "./components/ProfileCommentsItem";
import ProfilePostsItem from "./components/ProfilePostsItem";


const Profile = ({user, comments, posts}: any): React.JSX.Element => {
  const handleProfileKarmaLikeClick = (id: string) => {
    //do something
  };

  const handleProfileKarmaDislikeClick = (id: string) => {
    //do something
  };

  const handleProfileEditClick = (id: string) => {
    //do something
  };

  const renderProfile = () => {
    //const category_title = post.category ? post.category.title : '-';
    //const author_name = post.author ? post.author.username : '-';
    //const date = new Date(post.updateAt);
    //console.log(posts);

    return (
      <div className="row gutters-sm">

        <div className="col-md-4 mb-3">
          <ProfileCardItem
            key={`profile-card-item-${user.id}`}
            username={user.username}
            status={user.status}
            role={user.role}
            karma={user.karma}
            avatar={user.avatar}
            firstName={user.firstName}
            lastName={user.lastName}
            city={user.city}
            country={user.country}
            onProfileKarmaLikeClick={handleProfileKarmaLikeClick}
            onProfileKarmaDislikeClick={handleProfileKarmaDislikeClick}
            id={user.id}
          />

          {/*<ProfileSocialItem
            key={`profile-social-item-${user.id}`}
            social={user.social}
            id={user.id}
          />*/}
        </div>

        <div className="col-md-8">
          
          <ProfileInfoItem
            key={`profile-info-item-${user.id}`}
            username={user.username}
            email={user.email}
            firstName={user.firstName}
            lastName={user.lastName}
            age={user.age}
            city={user.city}
            country={user.country}
            createAt={user.createAt}
            onProfileEditClick={handleProfileEditClick}
            id={user.id}
          />

          <div className="row gutters-sm">

            {<ProfileCommentsItem
              key={`profile-comments-item-${user.id}`}
              comments={comments}
              id={user.id}
              />}

            {<ProfilePostsItem
              key={`profile-posts-item-${user.id}`}
              role={user.role}
              posts={posts}
              id={user.id}
              />}

          </div>

        </div>
      </div>
    );
  };

  return (
    <div>
      {renderProfile()}
    </div>
  );
};

export default Profile;