import React from "react";
import { Votes } from "./Votes";
import { YouIndicator } from "./YouIndicator";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { EditCommentButton } from "./EditCommentButon";
import { ReplyCommentButton } from "./ReplyCommentButton";

export const Reply = ({
  username,
  imageUrl,
  content,
  createdAt,
  vote,
  replyingTo,
  currentUser,
}) => {
  let renderYou = username === currentUser.username;

  return (
    <section className="comment flex p-3 align-items-start gap-3 my-3 surface-0 border-round-lg">
      <section className="votes surface-100 p-2 border-round-lg flex flex-column align-items-center">
        <Votes vote={vote}></Votes>
      </section>
      <section className="comment_head flex-1">
        <div className="flex justify-content-between align-items-center mb-3">
          <div className="comment_author_info flex align-items-center gap-3">
            <img
              className="comment_author_image block max-w-3rem"
              src={imageUrl}
              alt={"profile photo of " + username}
            />
            <h2 className="comment_author text-base font-medium">{username}</h2>
            {renderYou && <YouIndicator />}
            <p className="comment_createdAt text-600">{createdAt}</p>
          </div>
          {renderYou ? (
            <div className="flex gap-3">
              <DeleteCommentButton /> <EditCommentButton />
              {/* updateEditingState is missing here*/}
            </div>
          ) : (
            <ReplyCommentButton />
          )}
        </div>

        <section className="comment_main text-600">
          {<span className="text-blue-700 font-bold">@{replyingTo} </span>}
          {content}
        </section>
      </section>
    </section>
  );
};
