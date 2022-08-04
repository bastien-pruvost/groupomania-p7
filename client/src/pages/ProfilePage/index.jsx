import { useContext, useState } from 'react';
import useProfile from 'hooks/useProfile';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { AuthContext } from 'contexts/AuthContext';
import UserProfileForm from 'pages/ProfilePage/UserProfileForm';
import UserProfile from 'pages/ProfilePage/UserProfile';
import PostForm from 'components/Posts/PostForm';
import PostList from 'components/Posts/PostList';

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const { userData, userId, updateUserProfile } = useProfile();
  const { postsData, allPostsLoaded, refreshPostsData, scrollRef } = useInfiniteScroll(userId);

  return (
    <>
      {editMode ? (
        <UserProfileForm
          userData={userData}
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
