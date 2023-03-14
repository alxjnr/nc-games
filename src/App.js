import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ListOfReviews from "./components/ListOfReviews";
import ViewReview from "./components/ViewReview";
import ListOfCategories from "./components/ListOfCategories";
import ViewCategory from "./components/ViewCategory";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ListOfReviews />} />
        <Route path="/reviews/:review_id" element={<ViewReview />} />
        <Route path="/categories" element={<ListOfCategories />} />
        <Route path="/categories/:category_name" element={<ViewCategory />} />
      </Routes>
    </div>
  );
}

export default App;
