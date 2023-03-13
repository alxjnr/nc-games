import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToReviews = () => {
    navigate("/reviews");
  };

  return (
    <section>
      <button onClick={navigateToReviews}>reviews</button>
    </section>
  );
};

export default Home;
