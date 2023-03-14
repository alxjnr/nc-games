import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToReviews = () => {
    navigate("/reviews");
  };

  const navigateToCategories = () => {
    navigate("/categories");
  };

  return (
    <section className="home-section">
      <button onClick={navigateToReviews}>reviews</button>
      <br></br>
      <button onClick={navigateToCategories}>categories</button>
    </section>
  );
};

export default Home;
