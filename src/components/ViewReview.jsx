import { useEffect, useState } from "react";
import {
  getReviewById,
  getCommentsOnReview,
  patchUpvoteReview,
  patchDownvoteReview,
} from "../api";
import { useParams } from "react-router-dom";
import ViewComments from "./ViewComments";

const ViewReview = () => {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isReadingComments, setIsReadingComments] = useState(false);
  const [votes, setVotes] = useState("");
  const [voteWarning, setVoteWarning] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((data) => {
      setReview(data[0]);
      setCreatedDate(data[0].created_at.slice(0, 10));
      setVotes(data[0].votes);
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

  const upvoteReview = (review_id) => {
    if (!hasVoted) {
      setVoteWarning(false);
      patchUpvoteReview(review_id)
        .then(() => {
          setVotes((votes) => {
            return votes + 1;
          });
          setHasVoted(true);
        })
        .catch(() => {
          setVoteWarning(true);
        });
    } else {
    }
  };

  const downvoteReview = (review_id) => {
    if (!hasVoted) {
      setVoteWarning(false);
      patchDownvoteReview(review_id)
        .then(() => {
          setVotes((votes) => {
            return votes - 1;
          });
        })
        .catch(() => {
          setVoteWarning(true);
        });
      setHasVoted(true);
    } else {
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
            <h5>votes: {votes}</h5>
          </section>
          <img src={review.review_img_url} alt={review.title} />
          <h5>game designer: {review.designer}</h5>
          <section className="review-body-section">
            <h3>{review.review_body}</h3>
          </section>
          <section className="review-button-container">
            <button
              onClick={() => {
                renderComments(review_id);
              }}
            >
              {!isReadingComments ? <p>view comments</p> : <p>hide comments</p>}{" "}
              ({review.comment_count})
            </button>
            <section>
              <button
                onClick={() => {
                  upvoteReview(review_id);
                }}
              >
                upvote
              </button>
              <button
                onClick={() => {
                  downvoteReview(review_id);
                }}
              >
                downvote
              </button>
            </section>
          </section>
          {hasVoted ? (
            <p>thanks for your vote on this review</p>
          ) : (
            <section></section>
          )}
          {voteWarning ? <p>cannot vote at this time</p> : <section></section>}
          <ViewComments
            isLoadingComments={isLoadingComments}
            comments={comments}
            isReadingComments={isReadingComments}
          />
        </section>
      )}
    </section>
  );
};

export default ViewReview;
