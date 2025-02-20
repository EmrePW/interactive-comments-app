import { useEffect, useState } from "react";
import "./App.css";
import { Comments } from "./components/comments";
import { NewComment } from "./components/NewComment";

const App = () => {
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
};

export default App;
