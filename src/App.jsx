import { createContext, useEffect, useState, useRef } from "react";
import "./App.css";
import { Comments } from "./components/comments";
import { NewComment } from "./components/NewComment";
import { DeletePopup } from "./components/DeletePopup";

export const ModalContext = createContext();

const App = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [showDeletePopup, setDeletePopup] = useState(false); // track delete modal

  const [commentBeingDeletedId, setId] = useState(null);
  const [deletingReply, setDeletingReply] = useState(null);
  const [replyBeingDeletedId, setReplyBeingDeletedId] = useState(null);

  const commentRef = useRef();

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
        console.log(commentRef);
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
    <ModalContext.Provider
      value={{
        data,
        setData,
        showDeletePopup,
        setDeletePopup,
        commentBeingDeletedId,
        setId,
        deletingReply,
        setDeletingReply,
        replyBeingDeletedId,
        setReplyBeingDeletedId,
      }}
    >
      <main className="">
        <section className="main-wrapper surface-100 px-3">
          {showDeletePopup && (
            <DeletePopup
              id={commentBeingDeletedId}
              replyBeingDeletedId={replyBeingDeletedId}
              updateData={updateData}
              comments={data}
              updateReplies={commentRef.current.updateReplies}
            />
          )}
          <h1 style={{ textAlign: "center" }}>Comments</h1>
          <Comments
            comments={data}
            currentUser={user}
            ref={commentRef}
          ></Comments>
          <NewComment
            currentUser={user}
            addNewComment={updateData}
            comments={data}
          ></NewComment>
        </section>
      </main>
    </ModalContext.Provider>
  );
};

export default App;
