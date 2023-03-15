import { useState } from "react";
import { getReviews } from "../api";
import { useSearchParams } from "react-router-dom";

const ContentFilter = ({ setIsLoading, setReviews, category }) => {
  if (!category) {
    category = "";
  }
  const [reviewQuery, setReviewQuery] = useState({
    category: category,
    sort_by: "created_at",
    order: "asc",
  });
  let [searchParams, setSearchParams] = useSearchParams();

  const fetchReviewsWithQuery = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let categoryQuery = reviewQuery.category;
    let sortByQuery = reviewQuery.sort_by;
    let orderQuery = reviewQuery.order;
    getReviews(categoryQuery, sortByQuery, orderQuery).then((data) => {
      setReviews(data);
      setIsLoading(false);
      setSearchParams(reviewQuery);
    });
  };

  const clearQueries = () => {
    setReviewQuery({
      category: "",
      sort_by: "created_at",
      order: "asc",
    });
  };

  return (
    <section className="sort-reviews-section">
      <h5>filter</h5>
      <form onSubmit={fetchReviewsWithQuery}>
        <select
          onChange={(event) => {
            setReviewQuery((queries) => {
              return { ...queries, sort_by: event.target.value };
            });
          }}
        >
          <option value="created_at">date</option>
          <option value="comment_count">comments</option>
          <option value="votes">votes</option>
        </select>
        <select
          onChange={(event) => {
            setReviewQuery((queries) => {
              return { ...queries, order: event.target.value };
            });
          }}
        >
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
        <section className="sort-reviews-button-section">
          <button id="search-btn" onClick={fetchReviewsWithQuery}>
            search
          </button>
          <button onClick={clearQueries}>clear</button>
        </section>
      </form>
    </section>
  );
};

export default ContentFilter;
