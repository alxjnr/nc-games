import { useEffect, useState } from "react";
import { postCommentToReview } from "../api";
import { getCommentsOnReview } from "../api";

const ViewComments = ({ isReadingComments, review_id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [postError, setPostError] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    getCommentsOnReview(review_id).then((data) => {
      setComments(data.reverse());
      setIsLoadingComments(false);
    });
  }, []);

  const handleSubmit = (event, review_id) => {
    event.preventDefault();
    postCommentToReview(review_id, comment)
      .then(() => {
        getCommentsOnReview(review_id).then((data) => {
          setComments(data.reverse());
          setPostError(false);
        });
        setComment("");
      })
      .catch(() => {
        setPostError(true);
      });
  };

  return (
    <section>
      {isLoadingComments ? (
        <h2>loading...</h2>
      ) : (
        <section>
          <section>
            {comments.length === 0 && isReadingComments ? (
              <h3>this review currently has no comments.</h3>
            ) : (
              <section>
                {comments.map((comment) => {
                  return (
                    <section
                      key={comment.created_at + comment.author}
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
          <section>
            {!isReadingComments ? (
              <section></section>
            ) : (
              <section>
                <form
                  onSubmit={(event) => {
                    handleSubmit(event, review_id);
                  }}
                >
                  <input
                    placeholder="comment here..."
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                  ></input>
                  <button>submit</button>
                </form>
                {!postError ? (
                  <section></section>
                ) : (
                  <p>cannot post at this time</p>
                )}
              </section>
            )}
          </section>
        </section>
      )}
    </section>
  );
};

export default ViewComments;
