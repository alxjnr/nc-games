import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { useNavigate } from "react-router-dom";
const ListOfReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
  }, []);

  const navigateToReview = (review_id) => {
    navigate(`/reviews/${review_id}`);
  };

  return (
    <section>
      {isLoading ? (
        <h2>loading...</h2>
      ) : (
        <section className="review-list-section">
          {reviews.map((review) => {
            return (
              <section
                key={review.title}
                className="review-list-cards"
                onClick={() => {
                  navigateToReview(review.review_id);
                }}
              >
                <h2>{review.title}</h2>
                <img src={review.review_img_url} alt={review.title} />
                <h4>{review.owner}</h4>
                <section className="votes-comments-section">
                  <h5>votes: {review.votes}</h5>
                  <h5>comments: {review.comment_count}</h5>
                </section>
              </section>
            );
          })}
        </section>
      )}
    </section>
  );
};

export default ListOfReviews;
