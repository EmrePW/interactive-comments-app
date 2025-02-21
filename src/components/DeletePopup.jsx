import React, { useContext } from "react";

export const DeletePopup = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black-alpha-50 z-4">
      <div
        style={{ transform: "translate(-50%, -50%)" }}
        className="fixed top-50 left-50 max-w-24rem bg-white z-5 p-4 border-round-lg"
      >
        <h3 className="m-0 mb-4 font-semibold text-2xl">Delete comment</h3>
        <p className="mb-4 text-500">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex justify-content-between align-items-center gap-3">
          <button
            className="surface-600 text-white border-none px-4 py-3 font-semibold text-l border-round-lg cursor-pointer flex-1"
            type="button"
            onClick={() => {
              let deleteState;
              console.log(deleteState);
              console.log("clicked no!");
            }}
          >
            NO, CANCEL
          </button>
          <button
            className="bg-red-700 text-white border-none px-4 py-3 font-semibold text-l border-round-lg cursor-pointer flex-1"
            type="button"
            onClick={() => {
              // set delete to false
              // update data
              // update json
              console.log("clicked yes!");
            }}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};
