import React, { useState } from "react";

export const NewComment = ({ currentUser, addNewComment, comments }) => {
  const [newCommentContent, setNewCommentContent] = useState("");
  return (
    <article className="newComment-wrapper flex surface-0 p-3 border-round-lg mb-3">
      <img
        className="max-h-3rem"
        src={currentUser.image.png}
        alt={"profile photo of " + currentUser.username}
      />
      <form className="flex flex-1 justify-content-between align-items-center">
        <textarea
          className="newComment-input mx-3 p-3 border-400 border-round-lg outline-none w-full"
          type="text"
          name="commentContext"
          id="commentContext"
          required
          placeholder="Add a comment..."
          value={newCommentContent}
          onChange={(e) => {
            setNewCommentContent(e.target.value);
          }}
        />
        <button
          className="newComment-submit align-self-start px-4 py-3 bg-blue-700 border-none border-round-lg text-white font-semibold cursor-pointer"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            let new_comments = comments.slice();
            let new_comment = {
              content: newCommentContent,
              user: currentUser,
              createdAt: "1 second ago",
              score: 0,
              replies: [],
            };
            const postJson = async () => {
              try {
                fetch("http://localhost:4000/comments", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(new_comment),
                })
                  .then((response) => response.json())
                  .then((data) => console.log("Success:", data))
                  .catch((error) => console.error("Error:", error));
              } catch (error) {
                console.error("error in post");
              } finally {
                addNewComment([...new_comments, new_comment]); // setData()
              }
            };
            postJson();
          }}
        >
          SEND
        </button>
      </form>
    </article>
  );
};
