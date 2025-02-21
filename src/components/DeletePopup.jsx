import { React, useContext } from "react";
import { ModalContext } from "../App";

export const DeletePopup = ({ id, updateData, comments }) => {
  const { showDeletePopup, setDeletePopup } = useContext(ModalContext);
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
              setDeletePopup(!showDeletePopup);
            }}
          >
            NO, CANCEL
          </button>
          <button
            className="bg-red-700 text-white border-none px-4 py-3 font-semibold text-l border-round-lg cursor-pointer flex-1"
            type="button"
            onClick={() => {
              console.log("clicked yes!");
              // update data
              // update json
              // set delete to false
              const deleteCommentInDb = async (cid) => {
                try {
                  await fetch(`http://localhost:4000/comments/${cid}`, {
                    method: "DELETE",
                  })
                    .then((response) => response.json())
                    .then((data) => console.log("Deleted successfully", data))
                    .catch((error) => console.error("Error:", error));
                } catch (err) {
                  console.error(
                    "An error has occured while deleting comment with id " +
                      cid +
                      " " +
                      err
                  );
                } finally {
                  setDeletePopup(!showDeletePopup);
                  // update data
                  updateData(comments.filter((prd) => prd.id !== cid));
                }
              };
              deleteCommentInDb(id);
            }}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};
