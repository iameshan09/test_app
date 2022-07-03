import { comment } from 'postcss';
import React, { useState, useEffect } from 'react';
import closeButton from '../images/icons8-close-30.png';
import Comment from './Comment';
import { addComment } from '../posts';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function PostExpand(props) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  function onClose() {
    props.onClose();
  }

  const handleCommentChange = event => {
    setNewComment(event.target.value);
  };

  useEffect(() => {
    console.log('use effect');
  }, []);

  const onPublish = () => {
    axios
      .put(
        `https://test-app-backend09.herokuapp.com/app/main/${props.post._id}`,
        {
          comment: newComment,
        }
      )
      .then(
        res => {
          dispatch(addComment(res.data));
          onClose();
        },
        error => {
          setError(true);
          setErrorMessage(error.response.data);
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center w-96 bg-white my-6 rounded">
      <div className="flex items-center justify-center w-full relative h-12  rounded">
        <div className="flex items-center justify-center w-full">
          <p className="text-black font-normal text-base">
            {props.post.post_title}
          </p>
        </div>
        <div className="flex items-center justify-center absolute  right-4">
          <img
            src={closeButton}
            className="w-5 h-5"
            alt="close"
            onClick={onClose}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white w-11/12 rounded ">
        <div className="flex flex-col items-center justify-start w-full h-32 rounded p-4">
          <div className="flex items-center justify-start w-full">
            <p
              className="text-lg font-semibold"
              style={{ color: props.post.title_color }}
            >
              {props.post.post_title}
            </p>
          </div>
          <div className="flex items-center justify-start w-full m-1">
            <p className="text-black text-xs font-light ">
              {props.post.post_desc}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center w-full h-8 px-4">
          <p className="text-slate-500 text-sm font-normal">
            {props.post.comments.length} Comments
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white w-11/12   mt-1">
        {Array.isArray(props.post.comments) && props.post.comments.length
          ? props.post.comments.map(comment => (
              <div className="w-full mt-1" key={comment._id}>
                <Comment comment={comment.comment} />
              </div>
            ))
          : null}
      </div>
      <div className="flex flex-col items-center justify-center bg-white w-11/12  rounded border-gray-500 border-2 mt-2">
        <textarea
          id="description"
          name="description"
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          className="w-full h-full text-black p-2 text-center outline-none  resize-none "
          placeholder="New Comment Text"
        />
      </div>
      {error ? (
        <div className="flex items-start justify-center w-4/5 px-1 mx-1">
          <p className="text-red-600 text-xs font-normal">{errorMessage}</p>
        </div>
      ) : null}
      <div className="flex w-4/5 h-10 mt-1 mb-5">
        <button
          className="w-full border-2 border-gray-500 rounded bg-black text-white font-semibold text-base"
          onClick={onPublish}
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default PostExpand;
