import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ListOfReviews from "./components/ListOfReviews";
import ViewReview from "./components/ViewReview";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ListOfReviews />} />
        <Route path="/reviews/:review_id" element={<ViewReview />} />
      </Routes>
    </div>
  );
}

export default App;
