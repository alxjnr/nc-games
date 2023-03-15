import { useState } from "react";
import { getUser } from "../api";

const LogIn = ({ setUser, setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser(username).then((data) => {
      if (!data.length) {
        setUserError(true);
      } else {
        setUserError(false);
        setUser(username);
        setIsLoggedIn(true);
        setUsername("");
      }
    });
  };
  return (
    <form className="log-in-form" onSubmit={handleSubmit}>
      <input
        placeholder="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <button>log in</button>
      {userError ? <h5>invalid username</h5> : <section></section>}
    </form>
  );
};

export default LogIn;
