import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-hsvp.onrender.com/api",
});

export const getReviews = () => {
  return gamesApi.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};
