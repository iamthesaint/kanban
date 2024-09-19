import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";


const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
    else {
      setLoginCheck(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);


  return (
    <div className="nav">
      <div className="nav-title">
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className="nav-item">
            <button type="button">
              <Link to="/login">Login</Link>
            </button>
          </li>
        ) : (
          <li className="nav-item">
                <button
              type="button"
              onClick={() => {
                auth.logout();
                setLoginCheck(false);
                navigate("/login");
              }}>
                Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
