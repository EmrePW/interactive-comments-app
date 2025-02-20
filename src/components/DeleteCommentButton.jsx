import React from "react";

export const DeleteCommentButton = () => {
  return (
    <div className="comment-delete flex cursor-pointer align-items-center">
      <img src="icon-delete.svg" alt="delte svg" className="h-1rem w-1rem" />
      <button
        style={{ fontFamily: "inherit" }}
        className="border-none outline-none text-red-700 surface-0 cursor-pointer font-medium text-base px-2 py-3"
        type="button"
      >
        Delete
      </button>
    </div>
  );
};
