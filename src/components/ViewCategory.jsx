import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByCategory } from "../api";
import { useNavigate } from "react-router-dom";

const ViewCategory = () => {
  const [category, setCategory] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { category_name } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviewsByCategory(category_name).then((data) => {
      setReviews(data.reviews);
      setIsLoading(false);
    });
  }, []);

  const navigateToReview = (review_id) => {
    navigate(`/reviews/${review_id}`);
  };

  return (
    <section>
      <h2>reviews for {category_name}</h2>
      {isLoading ? (
        <h2>loading...</h2>
      ) : (
        <ul>
          {reviews.map((review) => {
            return (
              <li
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
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ViewCategory;
