import React, { useState } from "react";

export const EditCommentField = ({
  commentContent,
  updateEditingState,
  editing,
  updateCommentContent,
  currentComment,
  sourceComment,
}) => {
  const [content, setContent] = useState(commentContent);
  return (
    <div className="flex gap-3 flex-column align-items-end">
      <textarea
        className="outline-none border-round-lg border-2 border-solid border-400 p-3 w-full"
        name="editedCommentContent"
        id="editedCommentContent"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <button
        type="button"
        className="align-self-end px-4 py-3 bg-blue-700 border-none border-round-lg text-white font-semibold cursor-pointer"
        onClick={() => {
          const updateJson = async () => {
            try {
              if (sourceComment == null) {
                fetch(`http://localhost:4000/comments/${currentComment}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    content: content,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data))
                  .catch((error) => console.error("Error:", error));
              } else {
                //get replies
                const commentReq = await fetch(
                  `http://localhost:4000/comments/${sourceComment}`
                );
                const comment = await commentReq.json();
                //modify replies
                let newReplies = comment.replies;

                let indexOfReply = newReplies.findIndex(
                  (prd) => prd.id === currentComment
                );
                newReplies[indexOfReply].content = content;

                let newComment = comment;
                newComment.replies = newReplies;

                //put back into db
                fetch(`http://localhost:4000/comments/${sourceComment}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  // patch replies
                  body: JSON.stringify(newComment),
                });
              }
            } catch (err) {
              console.error(
                "An error has occured while trying to update comment!\n" + err
              );
            } finally {
              updateCommentContent(content);
              updateEditingState(!editing);
            }
          };
          updateJson();
        }}
      >
        UPDATE
      </button>
    </div>
  );
};
