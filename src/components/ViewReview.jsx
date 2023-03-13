import { useEffect, useState } from "react";
import { getReviewById, getCommentsOnReview } from "../api";
import { useParams } from "react-router-dom";

const ViewReview = () => {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isReadingComments, setIsReadingComments] = useState(false);

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

  const renderComments = (review_id) => {
    if (isReadingComments) {
      setComments([]);
      setIsReadingComments(false);
    } else {
      setIsLoadingComments(true);
      getCommentsOnReview(review_id).then((data) => {
        setComments(data);
        setIsLoadingComments(false);
        setIsReadingComments(true);
      });
    }
  };

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
          <button
            onClick={() => {
              renderComments(review_id);
            }}
          >
            {!isReadingComments ? <p>view comments</p> : <p>hide comments</p>} (
            {review.comment_count})
          </button>
          <section>
            {isLoadingComments ? (
              <h2>loading...</h2>
            ) : (
              <section>
                {comments.map((comment) => {
                  return (
                    <section
                      key={comment.created_at}
                      className="comment-section"
                    >
                      <h5>{comment.author}</h5>
                      <h4>{comment.body}</h4>
                      <h5>votes: {comment.votes}</h5>
                      <h5>{comment.created_at.slice(0, 10)}</h5>
                    </section>
                  );
                })}
              </section>
            )}
          </section>
        </section>
      )}
    </section>
  );
};

export default ViewReview;
