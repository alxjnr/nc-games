import { useEffect, useState } from "react";
import axios from "axios";
const ListOfReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://nc-games-hsvp.onrender.com/api/reviews").then((res) => {
      setReviews(res.data.reviews);
      setIsLoading(false);
    });
  }, []);

  return (
    <section>
      {isLoading ? (
        <h2>loading...</h2>
      ) : (
        <section className="review-list-section">
          {reviews.map((review) => {
            return (
              <section key={review.title} className="review-list-cards">
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
