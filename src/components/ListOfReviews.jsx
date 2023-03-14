import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { useNavigate } from "react-router-dom";
const ListOfReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewQuery, setReviewQuery] = useState({
    category: "",
    sort_by: "",
    order: "",
  });
  const [order, setOrder] = useState("desc");
  const [btnClass, setBtnClass] = useState(false);
  const [dateBtnColor, setDateBtnColor] = useState("#2f80ed");
  const [commentsBtnColor, setCommentsBtnColor] = useState("#2f80ed");
  const [votesBtnColor, setVotesBtnColor] = useState("#2f80ed");
  const [orderBtnColor, setOrderBtnColor] = useState("#2f80ed");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    getReviews("", "", "").then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
  }, []);

  const navigateToReview = (review_id) => {
    navigate(`/reviews/${review_id}`);
  };

  const fetchReviewsWithQuery = () => {
    setIsLoading(true);
    let categoryQuery = reviewQuery.category;
    let sortByQuery = reviewQuery.sort_by;
    let orderQuery = reviewQuery.order;
    getReviews(categoryQuery, sortByQuery, orderQuery).then((data) => {
      setReviews(data);
      setIsLoading(false);
      setReviewQuery({
        category: "",
        sort_by: "",
        order: "",
      });
    });
  };

  const flipOrder = () => {
    if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
    console.log(order);
  };

  return (
    <section>
      <section className="sort-reviews-section">
        <h5>filter</h5>
        <section className="sort-reviews-buttons">
          <button
            onClick={() => {
              dateBtnColor === "#0d2c57"
                ? setDateBtnColor("#2f80ed")
                : setDateBtnColor("#0d2c57");
              setReviewQuery((queries) => {
                return { ...queries, sort_by: "created_at" };
              });
            }}
            style={{ backgroundColor: dateBtnColor }}
          >
            date
          </button>
          <button
            onClick={() => {
              commentsBtnColor === "#0d2c57"
                ? setCommentsBtnColor("#2f80ed")
                : setCommentsBtnColor("#0d2c57");
              setReviewQuery((queries) => {
                return { ...queries, sort_by: "comment_count" };
              });
            }}
            style={{ backgroundColor: commentsBtnColor }}
          >
            comments
          </button>
          <button
            onClick={() => {
              votesBtnColor === "#0d2c57"
                ? setVotesBtnColor("#2f80ed")
                : setVotesBtnColor("#0d2c57");
              setReviewQuery((queries) => {
                return { ...queries, sort_by: "votes" };
              });
            }}
            style={{ backgroundColor: votesBtnColor }}
          >
            votes
          </button>
          <button
            onClick={() => {
              flipOrder();
              setReviewQuery((queries) => {
                return { ...queries, order: order };
              });
            }}
          >
            {order === "asc" ? "order asc" : "order desc"}
          </button>
          <button id="search-btn" onClick={fetchReviewsWithQuery}>
            search
          </button>
        </section>
      </section>
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
    </section>
  );
};

export default ListOfReviews;
