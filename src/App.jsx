import { createContext, useEffect, useState } from "react";
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
    <ModalContext.Provider
      value={{ showDeletePopup, setDeletePopup, commentBeingDeletedId, setId }}
    >
      <main className="">
        <section className="main-wrapper surface-100 px-3">
          {showDeletePopup && (
            <DeletePopup
              id={commentBeingDeletedId}
              updateData={updateData}
              comments={data}
            />
          )}
          <h1 style={{ textAlign: "center" }}>Comments</h1>
          <Comments comments={data} currentUser={user}></Comments>
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
