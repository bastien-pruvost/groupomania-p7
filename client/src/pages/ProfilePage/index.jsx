import { AuthContext } from 'contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import useProfile from 'hooks/useProfile';
import UserDescription from 'pages/ProfilePage/UserDescription';
import PostList from 'components/Posts/PostList';
import PostForm from 'components/Posts/PostForm';

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { userProfile, userId } = useProfile();
  const { postsData, allPostsLoaded, refreshPostsData, scrollRef } = useInfiniteScroll(userId);

  return (
    <>
      <UserDescription userProfile={userProfile} />
      {currentUser.id === userProfile.id && <PostForm refreshPostsData={refreshPostsData} />}
      <PostList postsData={postsData} allPostsLoaded={allPostsLoaded} scrollRef={scrollRef} />
    </>
  );
};

export default ProfilePage;
