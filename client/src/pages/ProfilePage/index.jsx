import { AuthContext } from 'contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import useProfile from 'hooks/useProfile';
import UserProfile from 'pages/ProfilePage/UserProfile';
import PostList from 'components/Posts/PostList';
import PostForm from 'components/Posts/PostForm';
import UserProfileForm from 'pages/ProfilePage/UserProfileForm';

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { userProfile, userId } = useProfile();
  const { postsData, allPostsLoaded, refreshPostsData, scrollRef } = useInfiniteScroll(userId);
  const [editMode, setEditMode] = useState(true);

  return (
    <>
      {editMode ? (
        <UserProfileForm userProfile={userProfile} />
      ) : (
        <UserProfile userProfile={userProfile} />
      )}
      {currentUser.id === userProfile.id && <PostForm refreshPostsData={refreshPostsData} />}
      <PostList postsData={postsData} allPostsLoaded={allPostsLoaded} scrollRef={scrollRef} />
    </>
  );
};

export default ProfilePage;
