import { useNavigate } from "react-router-dom";

const InvalidReview = () => {
  const navigate = useNavigate();

  const navigateToReviews = () => {
    navigate("/reviews");
  };
  return (
    <section className="no-page-section">
      <h2>oops...</h2>
      <h5>no review found</h5>
      <button onClick={navigateToReviews}>back to reviews</button>
    </section>
  );
};

export default InvalidReview;
