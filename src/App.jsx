import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const url = import.meta.env.VITE_JAVA_URL;

const App = () => {
  const [state, setState] = useState([]);
  const [input, setinput] = useState("");

  const postUser = async () => {
    try {
      const newData = {
        name: input,
      };
      if (input === "") {
        alert("тексть");
      } else {
        const response = await axios.post(url, newData);
        setState(response.data);
        setinput("");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const deleteUser = async (_id) => {
    console.log(_id);

    try {
      const response = await axios.delete(`${url}/${_id}`);
      setState(response.data);
    } catch (error) {}
    console.log("eeee", error);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(url);
      setState(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <input
        type="text"
        onChange={(e) => {
          setinput(e.target.value);
        }}
        value={input}
      />
      <button onClick={postUser}>dssds</button>
      {state.map((item) => (
        <div className="ChildrenContainer" key={item._id}>
          <div>
            <h1>{item.name}</h1>
          </div>
          <div>
            <button onClick={() => deleteUser(item._id)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
