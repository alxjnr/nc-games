import { useEffect, useState } from "react";
import {
  getCommentsOnReview,
  deleteComment,
  postCommentToReview,
} from "../api";

const ViewComments = ({ isReadingComments, review_id, user }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [postError, setPostError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [noUserError, setNoUserError] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    getCommentsOnReview(review_id).then((data) => {
      setComments(data.reverse());
      setIsLoadingComments(false);
    });
  }, []);

  const handleSubmit = (event, review_id) => {
    event.preventDefault();
    if (user === "") {
      setNoUserError(true);
    } else {
      setNoUserError(false);
      if (comment === "") {
        setEmptyError(true);
      } else {
        setEmptyError(false);
        let newComment = {
          author: user,
          body: comment,
          votes: 0,
        };
        setComments((comments) => {
          return [...comments, newComment];
        });
        postCommentToReview(review_id, comment, user)
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
    }
  };

  const removeComment = (comment_id) => {
    setComments((comments) => {
      return comments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
    });
    deleteComment(comment_id).then(() => {
      console.log("removed");
    });
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
                      <section>
                        <h5>{comment.author}</h5>
                      </section>
                      <h4>{comment.body}</h4>
                      <h5>votes: {comment.votes}</h5>
                      {user === comment.author ? (
                        <button
                          onClick={() => {
                            removeComment(comment.comment_id);
                          }}
                        >
                          delete
                        </button>
                      ) : (
                        <section></section>
                      )}
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
                  <p>comments cannot be empty, please try again</p>
                ) : (
                  <section></section>
                )}
                {noUserError ? (
                  <p>please log in to post a comment</p>
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
