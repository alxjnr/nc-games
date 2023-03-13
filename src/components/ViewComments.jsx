const ViewComments = ({ isLoadingComments, isReadingComments, comments }) => {
  return (
    <section>
      {isLoadingComments ? (
        <h2>loading...</h2>
      ) : (
        <section>
          {comments.length === 0 && isReadingComments ? (
            <h3>this review currently has no comments.</h3>
          ) : (
            <section>
              {comments.map((comment) => {
                return (
                  <section key={comment.created_at} className="comment-section">
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
      )}
    </section>
  );
};

export default ViewComments;
