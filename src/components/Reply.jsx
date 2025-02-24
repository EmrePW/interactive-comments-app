import { React, useState, forwardRef } from "react";
import { Votes } from "./Votes";
import { YouIndicator } from "./YouIndicator";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { EditCommentButton } from "./EditCommentButon";
import { ReplyCommentButton } from "./ReplyCommentButton";
import { EditCommentField } from "./EditCommentField";
import { NewReplyField } from "./NewReply";

export const Reply = ({
  id,
  username,
  imageUrl,
  content,
  createdAt,
  vote,
  replyingTo,
  currentUser,
  sourceComment,
  updateReplies,
}) => {
  let renderYou = username === currentUser.username;
  const [editing, setEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(content); // state for dyanmic content
  const [replying, setReplying] = useState(false);

  // EDITING FALSE
  const updateEditingState = (newState) => {
    setEditing(newState);
  };

  // function will go to EDITING TRUE
  const updateCommentContent = (newContent) => {
    setCommentContent(newContent);
  };

  const updateReplying = (newReplying) => {
    setReplying(newReplying);
  };

  return (
    <>
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
              <h2 className="comment_author text-base font-medium">
                {username}
              </h2>
              {renderYou && <YouIndicator />}
              <p className="comment_createdAt text-600">{createdAt}</p>
            </div>
            {renderYou ? (
              <div className="flex gap-3">
                <DeleteCommentButton
                  id={id}
                  sourceComment={sourceComment}
                  isReply={true}
                />
                <EditCommentButton
                  updateEditingState={updateEditingState}
                  editing={editing}
                />
              </div>
            ) : (
              <ReplyCommentButton
                replying={replying}
                updateReplying={updateReplying}
              />
            )}
          </div>
          {
            editing ? (
              <EditCommentField
                commentContent={commentContent}
                updateEditingState={updateEditingState}
                editing={editing}
                updateCommentContent={updateCommentContent}
                currentComment={id}
                sourceComment={sourceComment}
              />
            ) : (
              <section className="comment_main text-600">
                {
                  <span className="font-bold text-blue-700">
                    @{replyingTo}{" "}
                  </span>
                }
                {commentContent}
              </section>
            ) /* Editing comment field*/
          }
        </section>
      </section>
      {replying && (
        <NewReplyField
          currentUser={currentUser}
          commentId={id}
          sourceComment={sourceComment}
          replyingTo={username}
          replying={replying}
          isReply={true}
          updateReplying={updateReplying}
          updateReplies={updateReplies}
        />
      )}
    </>
  );
};
