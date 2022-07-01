import React, { useState } from 'react';
import closeButton from '../images/icons8-close-30.png';
import { addPost } from '../posts';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function CreatePost(props) {
  const dispatch = useDispatch();
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postTitleColor, setPostTitleColor] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function onClose() {
    props.onClose();
  }

  function onSetTitleColor(color) {
    console.log(color);
    setPostTitleColor(color);
  }

  const handleTitleChange = event => {
    setPostTitle(event.target.value);
  };

  const handleDescChange = event => {
    setPostDesc(event.target.value);
  };

  const onPublish = () => {
    axios
      .post('https://test-app-backend09.herokuapp.com/app/main/', {
        post_title: postTitle,
        post_desc: postDesc,
        title_color: postTitleColor,
      })
      .then(
        res => {
          dispatch(
            addPost({
              post_title: postTitle,
              post_desc: postDesc,
              title_color: postTitleColor,
              comments: [],
            })
          );
          props.onClose();
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
          <p className="text-black font-normal text-base">Create Post</p>
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
      <div className="flex flex-col  items-center justify-center w-full mt-6">
        <div className="flex items-center justify-center w-4/5 h-8 rounded border-gray-500 border-2 ">
          <input
            id="title"
            name="title"
            type="text"
            value={postTitle}
            onChange={handleTitleChange}
            className=" w-full h-full text-black p-2 text-center outline-none  "
            placeholder="Title"
          />
        </div>
        <div className="flex items-center justify-center w-4/5 rounded border-gray-500 border-2 mt-2">
          <textarea
            id="description"
            name="description"
            type="text"
            value={postDesc}
            onChange={handleDescChange}
            className="w-full h-full text-black p-2 text-center outline-none  resize-none "
            placeholder="Description"
          />
        </div>
        <div className="flex items-center justify-center w-4/5 mt-1  h-14">
          <div className="flex items-center justify-start w-1/2 ">
            <p className="text-black font-normal text-base">Title Color</p>
          </div>
          <div className="flex items-center justify-end w-1/2 ">
            <div className="grid gap-4 grid-cols-3 grid-rows-1  ">
              <button
                className="block border-solid  rounded bg-#3c7bb3 w-10 h-10 border-4"
                onClick={() => onSetTitleColor('#3c7bb3')}
                style={
                  postTitleColor == '#3c7bb3' ? { borderColor: '#03cdff' } : {}
                }
              />
              <button
                className="block border-solid  rounded bg-#fbdc83 w-10 h-10 border-4"
                onClick={() => onSetTitleColor('#fbdc83')}
                style={
                  postTitleColor == '#fbdc83' ? { borderColor: '#03cdff' } : {}
                }
              />
              <button
                className="block border-solid  rounded bg-#ea9683 w-10 h-10 border-4"
                onClick={() => onSetTitleColor('#ea9683')}
                style={
                  postTitleColor == '#ea9683' ? { borderColor: '#03cdff' } : {}
                }
              />
            </div>
          </div>
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
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
