import React from "react";
import { Reply } from "./Reply";

export const Replies = ({
  replies,
  currentUser,
  sourceComment,
  updateReplies,
}) => {
  const replyList = replies.map((rpl) => {
    return (
      <Reply
        key={rpl.id}
        id={rpl.id}
        username={rpl.user.username}
        imageUrl={rpl.user.image.png}
        content={rpl.content}
        createdAt={rpl.createdAt}
        vote={rpl.score}
        replyingTo={rpl.replyingTo}
        currentUser={currentUser}
        sourceComment={sourceComment}
        updateReplies={updateReplies}
      ></Reply>
    );
  });

  return <section className="comment_replies">{replyList}</section>;
};
