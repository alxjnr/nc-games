import { useEffect, useState } from "react";
import { getReviewById } from "../api";
import { useParams } from "react-router-dom";

const ViewReview = () => {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState("");

  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((data) => {
      console.log(data);
      setReview(data[0]);
      setCreatedDate(data[0].created_at.slice(0, 10));
      setIsLoading(false);
    });
  }, [review_id]);
  return (
    <section>
      {isLoading ? (
        <h2>loading...</h2>
      ) : (
        <section className="single-review-section">
          <h2>{review.title}</h2>
          <section className="single-review-date-username-section">
            <h5>{createdDate}</h5>
            <h5>{review.owner}</h5>
            <h5>votes: {review.votes}</h5>
          </section>
          <img src={review.review_img_url} alt={review.title} />
          <h5>game designer: {review.designer}</h5>
          <section className="review-body-section">
            <h3>{review.review_body}</h3>
          </section>
          <button>view comments ({review.comment_count})</button>
        </section>
      )}
    </section>
  );
};

export default ViewReview;
