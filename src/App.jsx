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
        <img src="icon-plus.svg" alt="upvote" />
      </button>
      <p>{newVote}</p>
      <button
        type="button"
        onClick={() => {
          setVote(newVote - 1);
        }}
      >
        {/* minus */}
        <img src="icon-minus.svg" alt="downvote" />
      </button>
    </>
  );
}

function Reply({ username, imageUrl, content, createdAt, vote, replyingTo }) {
  return (
    <section className="comment">
      <section className="votes">
        <Votes vote={vote}></Votes>
      </section>
      <section className="comment_head">
        <div className="comment_author_info">
          <img
            className="comment_author_image"
            src={imageUrl}
            alt={"profile photo of" + username}
          />
          <h2 className="comment_author">{username}</h2>
          <p className="comment_createdAt">{createdAt}</p>
        </div>
        <div className="comment_reply">
          <button type="button"></button>
        </div>
      </section>
      <section className="comment_main">
        @{replyingTo}
        {content}
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
  let renderReplies = replies ? true : false;

  return (
    <>
      <section className="comment">
        <section className="votes">
          <Votes vote={vote}></Votes>
        </section>
        <section className="comment_head">
          <div className="comment_author_info">
            <img
              className="comment_author_image"
              src={imageUrl}
              alt={"profile photo of" + username}
            />
            <h2 className="comment_author">{username}</h2>
            <p className="comment_createdAt">{createdAt}</p>
          </div>
          <div className="comment_reply">
            <button type="button"></button>
          </div>
        </section>
        <section className="comment_main">{content}</section>
      </section>
      {renderReplies && <Replies replies={replies}></Replies>}
    </>
  );
}

function Comments({ comments }) {
  const commentList = comments.map((cmt) => {
    return (
      <section key={cmt.id} className="comment-wrapper">
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
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/comments");
        const result = await response.json();
        setData(result);
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
  return (
    <main>
      <section className="main-wrapper">
        <h1 style={{ textAlign: "center" }}>Comments</h1>
        <Comments comments={data}></Comments>
      </section>
    </main>
  );
}

export default App;
