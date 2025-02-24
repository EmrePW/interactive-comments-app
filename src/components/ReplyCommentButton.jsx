import React from "react";

export const ReplyCommentButton = ({ replying, updateReplying }) => {
  const handleClick = () => {
    updateReplying(!replying);
    //if a reply add the reply to the super comments list

    // if a comment add the reply into the comments reply list
    // if the comment has not any replies create a new list its empty anyway
  };
  return (
    <div className="comment_reply flex cursor-pointer align-items-center">
      <img src="icon-reply.svg" alt="reply svg" className="h-1rem w-1rem" />
      <button
        style={{ fontFamily: "inherit" }}
        className="border-none outline-none text-blue-700 surface-0 cursor-pointer font-medium text-base px-2 py-3"
        type="button"
        onClick={handleClick}
      >
        Reply
      </button>
    </div>
  );
};
