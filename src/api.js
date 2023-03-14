import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-hsvp.onrender.com/api",
});

export const getReviews = () => {
  return gamesApi.get("/reviews").then(({ data }) => {
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

export const postCommentToReview = (review_id, body) => {
  return gamesApi
    .post(`/reviews/${review_id}/comments`, {
      username: "grumpy19",
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
