import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <section className="no-page-section">
      <h1>404</h1>
      <h4>no page here!</h4>
      <button onClick={navigateHome}>go home</button>
    </section>
  );
};

export default PageNotFound;
