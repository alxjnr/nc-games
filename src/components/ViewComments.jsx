import { useEffect, useState } from "react";
import { postCommentToReview } from "../api";
import { getCommentsOnReview } from "../api";

const ViewComments = ({ isReadingComments, review_id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [postError, setPostError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    getCommentsOnReview(review_id).then((data) => {
      setComments(data.reverse());
      setIsLoadingComments(false);
    });
  }, []);

  const handleSubmit = (event, review_id) => {
    event.preventDefault();
    if (comment === "") {
      setEmptyError(true);
    } else {
      setEmptyError(false);
      let newComment = {
        author: "grumpy19",
        body: comment,
        votes: 0,
      };
      setComments((comments) => {
        return [...comments, newComment];
      });
      postCommentToReview(review_id, comment)
        .then((data) => {
          setComments((comments) => {
            comments.splice(comments.length - 1, 1);
            return [...comments, data.comment];
          });
          setComment("");
        })
        .catch(() => {
          setPostError(true);
        });
    }
  };

  return (
    <section>
      {isLoadingComments ? (
        <h2>loading...</h2>
      ) : (
        <section>
          <ul>
            {comments.length === 0 && isReadingComments ? (
              <h3>this review currently has no comments.</h3>
            ) : (
              <section>
                {comments.map((comment) => {
                  return (
                    <li
                      key={comment.created_at + comment.author}
                      className="comment-section"
                    >
                      <h5>{comment.author}</h5>
                      <h4>{comment.body}</h4>
                      <h5>votes: {comment.votes}</h5>
                    </li>
                  );
                })}
              </section>
            )}
          </ul>
          <section>
            {!isReadingComments ? (
              <section></section>
            ) : (
              <section className="post-message-section">
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
                {emptyError ? (
                  <p>comments cannot be empty, please try again.</p>
                ) : (
                  <section></section>
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
