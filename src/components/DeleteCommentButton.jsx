import { useContext, React } from "react";
import { DeletePopup } from "./DeletePopup";
import { ModalContext } from "../App";

export const DeleteCommentButton = ({ id, sourceComment, isReply }) => {
  const {
    showDeletePopup,
    setDeletePopup,
    setId,
    deletingReply,
    setDeletingReply,
    replyBeingDeletedId,
    setReplyBeingDeletedId,
  } = useContext(ModalContext);

  return (
    <div className="comment-delete flex cursor-pointer align-items-center">
      <img src="icon-delete.svg" alt="delte svg" className="h-1rem w-1rem" />
      <button
        style={{ fontFamily: "inherit" }}
        className="border-none outline-none text-red-700 surface-0 cursor-pointer font-medium text-base px-2 py-3"
        type="button"
        onClick={() => {
          if (isReply) {
            setId(sourceComment);
            setDeletingReply(true);
            setReplyBeingDeletedId(id);
          } else {
            setId(id);
          }
          setDeletePopup(!showDeletePopup);
        }}
      >
        Delete
      </button>
    </div>
  );
};
