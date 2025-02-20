import React from "react";

export const EditCommentButton = ({ updateEditingState, editing }) => {
  return (
    <div className="comment_edit flex cursor-pointer align-items-center">
      <img src="icon-edit.svg" alt="edit svg" className="h-1rem w-1rem" />
      <button
        style={{ fontFamily: "inherit" }}
        className="border-none outline-none text-blue-700 surface-0 cursor-pointer font-medium text-base px-2 py-3"
        type="button"
        onClick={() => {
          updateEditingState(!editing);
        }}
        disabled={editing}
      >
        Edit
      </button>
    </div>
  );
};
