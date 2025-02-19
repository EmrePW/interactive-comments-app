import { useEffect, useState } from "react";
import "./App.css";

function Votes({ vote }) {
  const [newVote, setVote] = useState(vote);
  // check if already upvoted or downvoted if yes block the said action from happening
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setVote(newVote + 1);
        }}
      >
        {/* plus */}
        <img className="" src="/icon-plus.svg" alt="upvote" />
      </button>
      <p>{newVote}</p>
      <button
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

function Reply({ username, imageUrl, content, createdAt, vote, replyingTo }) {
  return (
    <section className="comment flex p-3 align-items-center gap-3 my-3 surface-0 border-round-lg">
      <section className="votes surface-100 p-2 border-round-lg flex flex-column align-items-center">
        <Votes vote={vote}></Votes>
      </section>
      <section className="comment_head">
        <div className="comment_author_info flex">
          <img
            className="comment_author_image"
            src={imageUrl}
            alt={"profile photo of" + username}
          />
          <h2 className="comment_author">{username}</h2>
          <p className="comment_createdAt">{createdAt}</p>
        </div>
        <div className="comment_reply">
          <img src="icon-reply.svg" alt="reply svg" />
          <button type="button">REPLY</button>
        </div>
        <section className="comment_main">
          @{replyingTo}
          {content}
        </section>
      </section>
    </section>
  );
}

function Replies({ replies }) {
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
      ></Reply>
    );
  });

  return <section className="comment_replies">{replyList}</section>;
}

function Comment({ vote, content, createdAt, username, imageUrl, replies }) {
  // render reply above 768px
  // check if reply
  let renderReplies = replies.length === 0 ? false : true;

  return (
    <>
      <section className="comment flex p-3 align-items-center gap-3 surface-0 border-round-lg">
        <section className="votes surface-100 p-2 border-round-lg flex flex-column align-items-center">
          <Votes vote={vote}></Votes>
        </section>
        <section className="comment_head">
          <div className="comment_author_info flex">
            <img
              className="comment_author_image"
              src={imageUrl}
              alt={"profile photo of " + username}
            />
            <h2 className="comment_author">{username}</h2>
            <p className="comment_createdAt">{createdAt}</p>
          </div>
          <div className="comment_reply">
            <img src="icon-reply.svg" alt="reply svg" />
            <button type="button">REPLY</button>
          </div>
          <section className="comment_main">{content}</section>
        </section>
      </section>
      {renderReplies && <Replies replies={replies}></Replies>}
    </>
  );
}

function NewComment({ currentUser }) {
  return (
    <article className="newComment-wrapper surface-0 p-3 border-round-lg mb-3">
      <img
        className=""
        src={currentUser.image.png}
        alt={"profile photo of " + currentUser.username}
      />
      <form action="">
        <input
          className="newComment-input"
          type="text"
          name="commentContext"
          id="commentContext"
          required
        />
        <button className="newComment-submit" type="submit">
          SEND
        </button>
      </form>
    </article>
  );
}

function Comments({ comments }) {
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
      <section className="main-wrapper surface-400 px-3">
        <h1 style={{ textAlign: "center" }}>Comments</h1>
        <Comments comments={data}></Comments>
        <NewComment currentUser={user}></NewComment>
      </section>
    </main>
  );
}

export default App;
