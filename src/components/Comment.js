import React from 'react';

function Comment(props) {
  return (
    <div className="flex w-full px-2 py-1 rounded border border-gray-500 bg-slate-300">
      <p className="text-black text-xs font-light">{props.comment}</p>
    </div>
  );
}

export default Comment;
