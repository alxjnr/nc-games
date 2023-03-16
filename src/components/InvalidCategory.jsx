import { useNavigate } from "react-router-dom";

const InvalidCategory = () => {
  const navigate = useNavigate();

  const navigateToCategories = () => {
    navigate("/categories");
  };
  return (
    <section className="no-page-section">
      <h1>oops...</h1>
      <h4>no category found!</h4>
      <button onClick={navigateToCategories}>back to categories</button>
    </section>
  );
};

export default InvalidCategory;
