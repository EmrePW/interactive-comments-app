import React from "react";

export const ReplyCommentButton = () => {
  return (
    <div className="comment_reply flex cursor-pointer align-items-center">
      <img src="icon-reply.svg" alt="reply svg" className="h-1rem w-1rem" />
      <button
        style={{ fontFamily: "inherit" }}
        className="border-none outline-none text-blue-700 surface-0 cursor-pointer font-medium text-base px-2 py-3"
        type="button"
      >
        Reply
      </button>
    </div>
  );
};
