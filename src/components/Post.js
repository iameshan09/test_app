import React from 'react';

function Post(props) {
  return (
    <div
      className="flex flex-col items-center justify-center bg-white w-80 rounded"
      onClick={() =>
        props.onClick(
          props.post._id,
          props.post.post_title,
          props.post.post_desc,
          props.post.title_color,
          props.post.comments
        )
      }
    >
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
  );
}

export default Post;
