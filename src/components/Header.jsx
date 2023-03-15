import { useNavigate } from "react-router-dom";

const Header = ({ user, isLoggedIn }) => {
  const navigateToHome = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  return (
    <section className="header-section">
      <h1 onClick={navigateToHome}>nc-games</h1>
      {isLoggedIn ? <h6>{user}</h6> : <p></p>}
    </section>
  );
};

export default Header;
