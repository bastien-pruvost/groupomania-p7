import PostForm from 'components/Posts/PostForm';
import PostList from 'components/Posts/PostList';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
// import styles from './FeedPage.module.css';

const FeedPage = () => {
  const { postsData, allPostsLoaded, refreshPostsData, scrollRef } = useInfiniteScroll();

  return (
    <>
      <PostForm refreshPostsData={refreshPostsData} />
      <PostList
        postsData={postsData}
        allPostsLoaded={allPostsLoaded}
        scrollRef={scrollRef}
        refreshPostsData={refreshPostsData}
      />
    </>
  );
};

export default FeedPage;
