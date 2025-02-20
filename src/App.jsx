import { use, useEffect, useState } from "react";
import "./App.css";

function ReplyButton() {
  return (
    <div className="comment_reply flex cursor-pointer align-items-center">
      <img src="icon-reply.svg" alt="reply svg" className="h-1rem w-1rem" />
      <button
        style={{ fontFamily: "inherit" }}
        className="border-none outline-none text-blue-700 surface-0 cursor-pointer font-medium text-base px-2 py-3"
        type="button"
      >
        Reply
      </button>
    </div>
  );
}

function DeleteAndEditButton() {
  return (
    <div className="flex gap-3">
      <div className="comment-delete flex cursor-pointer align-items-center">
        <img src="icon-delete.svg" alt="delte svg" className="h-1rem w-1rem" />
        <button
          style={{ fontFamily: "inherit" }}
          className="border-none outline-none text-red-700 surface-0 cursor-pointer font-medium text-base px-2 py-3"
          type="button"
        >
          Delete
        </button>
      </div>
      <div className="comment_edit flex cursor-pointer align-items-center">
        <img src="icon-edit.svg" alt="edit svg" className="h-1rem w-1rem" />
        <button
          style={{ fontFamily: "inherit" }}
          className="border-none outline-none text-blue-700 surface-0 cursor-pointer font-medium text-base px-2 py-3"
          type="button"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

function YouIndicator() {
  return (
    <p className="bg-blue-700 text-white m-0 px-2 py-1 border-round-lg text-sm">
      you
    </p>
  );
}

function Votes({ vote }) {
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
}

function Reply({
  username,
  imageUrl,
  content,
  createdAt,
  vote,
  replyingTo,
  currentUser,
}) {
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
          {renderYou ? <DeleteAndEditButton /> : <ReplyButton />}
        </div>

        <section className="comment_main text-600">
          {<span className="text-blue-700 font-bold">@{replyingTo} </span>}
          {content}
        </section>
      </section>
    </section>
  );
}

function Replies({ replies, currentUser }) {
  const replyList = replies.map((rpl) => {
    return (
      <Reply
        key={rpl.id}
        username={rpl.user.username}
        imageUrl={rpl.user.image.png}
        content={rpl.content}
        createdAt={rpl.createdAt}
        vote={rpl.score}
        replyingTo={rpl.replyingTo}
        currentUser={currentUser}
      ></Reply>
    );
  });

  return <section className="comment_replies">{replyList}</section>;
}

function Comment({
  vote,
  content,
  createdAt,
  username,
  imageUrl,
  replies,
  currentUser,
}) {
  // render reply above 768px
  // check if reply
  let renderYou = currentUser.username === username;

  let renderReplies = replies.length === 0 ? false : true;
  return (
    <>
      <section className="comment flex p-3 align-items-start gap-3 surface-0 border-round-lg">
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

            {renderYou ? <DeleteAndEditButton /> : <ReplyButton />}
          </div>
          <section className="comment_main text-600">{content}</section>
        </section>
      </section>
      {renderReplies && (
        <Replies replies={replies} currentUser={currentUser}></Replies>
      )}
    </>
  );
}

function NewComment({ currentUser, addNewComment, comments }) {
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
          className="newComment-submit align-self-start px-4 py-3 bg-blue-700 border-none border-round-lg text-white font-semibold"
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
}

function Comments({ comments, currentUser }) {
  const commentList = comments.map((cmt) => {
    return (
      <section key={cmt.id} className="comment-wrapper mb-3 border-round-lg">
        <Comment
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
}

function App() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const updateData = (newData) => {
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await fetch("http://localhost:4000/comments");
        const dataResult = await dataResponse.json();
        setData(dataResult);
        const userResponse = await fetch("http://localhost:4000/currentUser");
        const userResult = await userResponse.json();
        setUser(userResult);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data!</div>;
  }
  if (!user) {
    return <div>No user!</div>;
  }
  return (
    <main>
      <section className="main-wrapper surface-100 px-3">
        <h1 style={{ textAlign: "center" }}>Comments</h1>
        <Comments comments={data} currentUser={user}></Comments>
        <NewComment
          currentUser={user}
          addNewComment={updateData}
          comments={data}
        ></NewComment>
      </section>
    </main>
  );
}

export default App;
