import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigateToHome = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  return (
    <section className="header-section">
      <h1 onClick={navigateToHome}>nc-games</h1>
    </section>
  );
};

export default Header;
