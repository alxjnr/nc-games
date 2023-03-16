import { useNavigate } from "react-router-dom";
import LogIn from "./LogIn";

const Home = ({ setUser, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const navigateToReviews = () => {
    navigate("/reviews");
  };

  const navigateToCategories = () => {
    navigate("/categories");
  };

  return (
    <section>
      <section className="home-section-buttons">
        <button onClick={navigateToReviews}>reviews</button>
        <br></br>
        <button onClick={navigateToCategories}>categories</button>
      </section>
      <section className="home-description">
        <h2>Welcome to NC-GAMES</h2>
        <p>
          NC-GAMES hosts a comprehensive database of board game reviews and
          information. <br></br>
          <br></br>The app allows users to interact with the database by voting
          and commenting on the reviews, as well as filtering the reviews and
          games by date, comments, and votes.
        </p>
      </section>
      <LogIn setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
    </section>
  );
};

export default Home;
