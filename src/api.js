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
