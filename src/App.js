import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ListOfReviews from "./components/ListOfReviews";
import ViewReview from "./components/ViewReview";
import ListOfCategories from "./components/ListOfCategories";
import ViewCategory from "./components/ViewCategory";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header user={user} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={<Home setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/reviews" element={<ListOfReviews />} />
        <Route
          path="/reviews/:review_id"
          element={<ViewReview user={user} />}
        />
        <Route path="/categories" element={<ListOfCategories />} />
        <Route path="/categories/:category_name" element={<ViewCategory />} />
      </Routes>
    </div>
  );
}

export default App;
