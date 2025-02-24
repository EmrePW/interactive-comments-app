import React, { forwardRef } from "react";
import { Comment } from "./Comment";

export const Comments = forwardRef(({ comments, currentUser }, ref) => {
  const commentList = comments.map((cmt) => {
    return (
      <section key={cmt.id} className="comment-wrapper mb-3 border-round-lg">
        <Comment
          id={cmt.id}
          ref={ref}
          vote={cmt.score}
          content={cmt.content}
          createdAt={cmt.createdAt}
          username={cmt.user.username}
          imageUrl={cmt.user.image.png}
          replies={cmt.replies}
          currentUser={currentUser}
        ></Comment>
      </section>
    );
  });

  return <article className="comments">{commentList}</article>;
});
