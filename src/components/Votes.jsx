import axios from "axios";
import React, { useContext, useState } from "react";
import { ModalContext } from "../App";

export const Votes = ({ vote, sourceComment, replyId }) => {
  const { data } = useContext(ModalContext);
  const [newVote, setVote] = useState(vote);
  let initalVote = vote;
  // check if already upvoted or downvoted if yes block the said action from happening
  return (
    <>
      <button
        className="border-none cursor-pointer"
        type="button"
        onClick={() => {
          console.log("click on plus");
          if (newVote === initalVote + 1) return;
          setVote(newVote + 1);
          // update server
          if (replyId) {
            console.log("entered if");
            let comment = data.find((prd) => prd.id === sourceComment);
            let newReplies = comment.replies;
            let replyIndex = newReplies.findIndex((prd) => prd.id === replyId);
            let reply = newReplies[replyIndex];
            reply.score = initalVote + 1;
            newReplies[replyIndex] = reply;
            comment.replies = newReplies;
            axios.put(
              `http://localhost:4000/comments/${sourceComment}`,
              JSON.stringify(comment)
            );

            return;
          }
          console.log("got past if");
          axios.patch(`http://localhost:4000/comments/${sourceComment}`, {
            score: initalVote + 1,
          });

          setCanUpVote(false);
        }}
      >
        {/* plus */}
        <img className="" src="/icon-plus.svg" alt="upvote" />
      </button>
      <p className="text-blue-700 font-bold">{newVote}</p>
      <button
        className="border-none cursor-pointer"
        type="button"
        onClick={() => {
          if (newVote === initalVote - 1) return;
          setVote(newVote - 1);
          console.log(newVote);
          // update server
          if (replyId) {
            console.log("entered if");
            let comment = data.find((prd) => prd.id === sourceComment);
            let newReplies = comment.replies;
            let replyIndex = newReplies.findIndex((prd) => prd.id === replyId);
            let reply = newReplies[replyIndex];
            reply.score = initalVote - 1;
            newReplies[replyIndex] = reply;
            comment.replies = newReplies;
            axios.put(
              `http://localhost:4000/comments/${sourceComment}`,
              JSON.stringify(comment)
            );

            return;
          }
          axios.patch(`http://localhost:4000/comments/${sourceComment}`, {
            score: initalVote - 1,
          });
        }}
      >
        {/* minus */}
        <img src="/icon-minus.svg" alt="downvote" />
      </button>
    </>
  );
};
