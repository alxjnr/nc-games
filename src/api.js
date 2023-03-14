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
