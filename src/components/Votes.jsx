import React, { useState } from "react";

export const Votes = ({ vote }) => {
  const [newVote, setVote] = useState(vote);
  // check if already upvoted or downvoted if yes block the said action from happening
  return (
    <>
      <button
        className="border-none cursor-pointer"
        type="button"
        onClick={() => {
          setVote(newVote + 1);
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
          setVote(newVote - 1);
        }}
      >
        {/* minus */}
        <img src="/icon-minus.svg" alt="downvote" />
      </button>
    </>
  );
};
