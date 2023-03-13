import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [test, setTest] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-games-hsvp.onrender.com/api/categories")
      .then((res) => {
        console.log(res);
      });
  });
  return <div className="App"></div>;
}

export default App;
