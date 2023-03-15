import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-hsvp.onrender.com/api",
});

export const getReviews = (category, sort_by, order) => {
  let categoryQuery = "";
  let sortByQuery = "";
  let orderQuery = "";
  let isQuery = "";

  if (category !== "") {
    categoryQuery = `category=${category}&`;
  }

  if (sort_by !== "") {
    sortByQuery = `sort_by=${sort_by}&`;
  }

  if (order !== "") {
    orderQuery = `order=${order}`;
  }

  if (category !== "" || sort_by !== "" || order !== "") {
    isQuery = "?";
  }

  if (isQuery === "?") {
    if (orderQuery !== "") {
      orderQuery = `order=${order}`;
    } else {
      orderQuery = `order=desc`;
    }
  }
  return gamesApi
    .get(`/reviews${isQuery}${categoryQuery}${sortByQuery}${orderQuery}`)
    .then(({ data }) => {
      return data.reviews;
    });
};

export const getReviewById = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const getCommentsOnReview = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchUpvoteReview = (review_id) => {
  return gamesApi
    .patch(`/reviews/${review_id}`, {
      inc_votes: 1,
    })
    .then(({ data }) => {
      return data;
    });
};

export const patchDownvoteReview = (review_id) => {
  return gamesApi
    .patch(`/reviews/${review_id}`, {
      inc_votes: -1,
    })
    .then(({ data }) => {
      return data;
    });
};

export const postCommentToReview = (review_id, body, user) => {
  return gamesApi
    .post(`/reviews/${review_id}/comments`, {
      username: user,
      body: body,
    })
    .then(({ data }) => {
      return data;
    });
};

export const getCategories = () => {
  return gamesApi.get(`/categories`).then(({ data }) => {
    return data;
  });
};

export const getReviewsByCategory = (category, sort_by, order) => {
  return gamesApi.get(`/reviews?category=${category}`).then(({ data }) => {
    return data;
  });
};

export const getUser = (username) => {
  return gamesApi.get(`/users`).then(({ data }) => {
    const filteredUsers = data.users.filter((user) => {
      return user.username === username;
    });
    return filteredUsers;
  });
};

export const deleteComment = (comment_id) => {
  return gamesApi.delete(`comments/${comment_id}`);
};
