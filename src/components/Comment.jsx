import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import { Votes } from "./Votes";
import { YouIndicator } from "./YouIndicator";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { EditCommentButton } from "./EditCommentButon";
import { EditCommentField } from "./EditCommentField";
import { Replies } from "./Replies";
import { ReplyCommentButton } from "./ReplyCommentButton";
import { NewReplyField } from "./NewReply";

export const Comment = forwardRef(
  (
    { id, vote, content, createdAt, username, imageUrl, replies, currentUser },
    ref
  ) => {
    // render reply above 768px
    // check if reply
    let renderYou = currentUser.username === username;
    const [commentContent, setCommentContent] = useState(content); // state for dyanmic content
    const [editing, setEditing] = useState(false);
    const [replying, setReplying] = useState(false);
    const [commentReplies, setCommentsReplies] = useState(replies);
    // char state tutulacak
    const [commentOperation, setCommentOperation] = useState("N");
    /*
  N : Not doing anything,
  R: Replying
  U: Editing
  D: Deleting
  */

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

    const updateReplies = (newReplies) => {
      setCommentsReplies(newReplies);
    };

    useImperativeHandle(ref, () => ({
      updateReplies,
    }));

    let renderReplies = replies.length === 0 ? false : true;
    return (
      <>
        <section className="comment flex p-3 align-items-start gap-3 surface-0 border-round-lg">
          <section className="votes surface-100 p-2 border-round-lg flex flex-column align-items-center">
            <Votes vote={vote} sourceComment={id}></Votes>
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
                  <DeleteCommentButton id={id} />
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

            {editing ? (
              <EditCommentField
                commentContent={commentContent}
                updateEditingState={updateEditingState}
                editing={editing}
                updateCommentContent={updateCommentContent}
                currentComment={id}
              />
            ) : (
              <section className="comment_main text-600">
                {commentContent}
              </section>
            )}
          </section>
        </section>

        {renderReplies ? (
          <>
            <section className="comment_replies">
              {replying && (
                <NewReplyField
                  currentUser={currentUser}
                  commentId={id}
                  commentReplies={replies}
                  replyingTo={username}
                  replying={replying}
                  updateReplying={updateReplying}
                  updateReplies={updateReplies}
                />
              )}
            </section>
            <Replies
              replies={commentReplies}
              currentUser={currentUser}
              sourceComment={id}
              updateReplies={updateReplies}
            ></Replies>
          </>
        ) : (
          <section className="comment_replies">
            {replying && (
              <NewReplyField
                currentUser={currentUser}
                commentId={id}
                replyingTo={username}
                replying={replying}
                updateReplying={updateReplying}
                updateReplies={updateReplies}
              />
            )}
          </section>
        )}
      </>
    );
  }
);
