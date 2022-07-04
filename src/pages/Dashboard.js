import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { getPosts } from '../posts';
import PostExpand from '../components/PostExpand';

function Dashboard(props) {
  const dispatch = useDispatch();
  const [createPost, setCreatePost] = useState(false);
  const [postFocused, setPostFocused] = useState(false);
  const [focusedPost, setFocusedPost] = useState({});
  const [filter, setFilter] = useState(false);
  const posts = useSelector(state => state.posts.posts);

  const onCreatePost = () => {
    setCreatePost(true);
  };

  const filterPosts = () => {
    if (filter) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  };

  function onClose() {
    setCreatePost(false);
  }

  function onPostClosed() {
    setPostFocused(false);
  }

  const onComponentFocused = (_id, title, desc, color, comments) => {
    setFocusedPost({
      _id: _id,
      post_title: title,
      post_desc: desc,
      title_color: color,
      comments: comments,
    });
    setPostFocused(true);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-neutral-200 min-h-screen relative">
      <Header />
      {!createPost && !postFocused ? (
        <div>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center justify-center mt-6 mr-1">
              <button
                className="bg-sky-500 w-56 h-10 text-white font-medium text-base rounded"
                onClick={onCreatePost}
              >
                Create New Post
              </button>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                className="bg-sky-500 w-16 h-10 text-white font-medium text-base rounded"
                onClick={filterPosts}
              >
                filter
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-2">
            {Array.isArray(posts) && posts.length
              ? posts.map(post => (
                  <div className="flex p-2.5 " key={post._id}>
                    {!filter ? (
                      <Post post={post} onClick={onComponentFocused} />
                    ) : post.comments.length ? (
                      <Post post={post} onClick={onComponentFocused} />
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : createPost && !postFocused ? (
        <CreatePost onClose={onClose} />
      ) : !createPost && postFocused ? (
        <PostExpand post={focusedPost} onClose={onPostClosed} />
      ) : null}

      <></>
    </div>
  );
}

export default Dashboard;
