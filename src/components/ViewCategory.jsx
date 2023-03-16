import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../api";
import { useNavigate } from "react-router-dom";
import ContentFilter from "./ContentFilter";
import InvalidCategory from "./InvalidCategory";

const ViewCategory = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidCategory, setIsInvalidCategory] = useState(false);

  const navigate = useNavigate();

  const { category_name } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviews(category_name, "", "")
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsInvalidCategory(true);
      });
  }, [category_name]);

  const navigateToReview = (review_id) => {
    navigate(`/reviews/${review_id}`);
  };

  return (
    <section>
      {isInvalidCategory ? (
        <InvalidCategory />
      ) : (
        <section>
          <section>
            <h2>reviews for {category_name}</h2>
          </section>
          <ContentFilter
            setIsLoading={setIsLoading}
            setReviews={setReviews}
            category={category_name}
          />
          <section>
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
        </section>
      )}
    </section>
  );
};

export default ViewCategory;
