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
  const { userData, setUserData, userId, updateUserProfile } = useProfile();
  const { postsData, allPostsLoaded, refreshPostsData, scrollRef } = useInfiniteScroll(userId);
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <UserProfileForm
          userData={userData}
          setUserData={setUserData}
          setEditMode={setEditMode}
          updateUserProfile={updateUserProfile}
        />
      ) : (
        <UserProfile userData={userData} editMode={editMode} setEditMode={setEditMode} />
      )}
      {currentUser.id === userData.id && <PostForm refreshPostsData={refreshPostsData} />}
      <PostList
        postsData={postsData}
        allPostsLoaded={allPostsLoaded}
        scrollRef={scrollRef}
        refreshPostsData={refreshPostsData}
      />
    </>
  );
};

export default ProfilePage;
