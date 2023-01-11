import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const deletePost = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        setPosts(
          posts.filter((post) => {
            return post.id !== id;
          })
        );
      } else {
        return;
      }
    });
  };

  return (
    <div className="App">
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="button">
              <div className="delete-btn" onClick={() => deletePost(post.id)}>
                Delete
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
