import { React, useContext, useState } from "react";
import { ModalContext } from "../App";

export const NewReplyField = ({
  currentUser,
  commentId,
  commentReplies,
  replyingTo,
  replying,
  updateReplying,
  updateReplies,
}) => {
  const [replyContent, setReplyContent] = useState("");
  const { data, setData } = useContext(ModalContext);
  return (
    <section className="comment flex p-3 align-items-start gap-3 my-3 surface-0 border-round-lg">
      <section className="comment_head flex-1 flex gap-3">
        <img
          className="comment_author_image block max-h-3rem"
          src={currentUser.image.png}
          alt={"profile photo of " + currentUser.username}
        />
        <textarea
          required
          className="flex-1 outline-none border-round-lg border-2 border-solid border-400 p-3 w-full"
          onChange={(e) => {
            setReplyContent(e.target.value);
          }}
        />
        <button
          onClick={() => {
            // update the replies list of the comment
            let comment = data.filter((prd) => prd.id == commentId)[0];
            let commentIndex = data.findIndex((prd) => prd.id == commentId);
            console.log(comment);

            let newReplies = [
              ...comment.replies,
              {
                id: Date.now().toString(),
                content: replyContent,
                createdAt: "1 second ago",
                score: 0,
                user: currentUser,
                replyingTo: replyingTo,
              },
            ];

            console.log(newReplies);

            comment.replies = newReplies;
            // // put replies into the comment in db
            const patchJson = async () => {
              await fetch(`http://localhost:4000/comments/${commentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(comment),
              })
                .then((res) => res.json())
                .catch((err) => console.error(err));
            };
            patchJson();
            updateReplying(!replying);
            updateReplies(newReplies);
          }}
          className="align-self-start px-4 py-3 bg-blue-700 border-none border-round-lg text-white font-semibold cursor-pointer"
        >
          REPLY
        </button>
      </section>
    </section>
  );
};
