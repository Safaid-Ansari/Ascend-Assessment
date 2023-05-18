import "../styles/Header.css";

import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="header">
      {/* <Link to="/"> */}
      <Link to="/" title="home page">
        <img
          className="header__icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbWVmGZETeZJcWPUwj7pNfF6-bO4j9paWj6XOiiciDd2O8Vn8ErpJ59gfVPvr5Lc-Aq9s&usqp=CAU"
          alt="ASCEND LOGO"
        />
      </Link>

      {/* </Link> */}
      <div className="innerSpan">
        <span>
          <Link to="/register" title="sign-up">
            SignUp{" "}
          </Link>
        </span>
        <span>
          <Link to="/login" title="sign-in">
            Login{" "}
          </Link>
        </span>

        {localStorage.getItem("user") ? (
          <span onClick={logout}>Logout</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;
