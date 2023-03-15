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
      <section className="home-section">
        <button onClick={navigateToReviews}>reviews</button>
        <br></br>
        <button onClick={navigateToCategories}>categories</button>
      </section>
      <LogIn setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
    </section>
  );
};

export default Home;
