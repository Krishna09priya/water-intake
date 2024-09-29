import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { removeUser } from './store/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand">
        <h4>Water-Intake Management</h4>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav" style={{ float: "left" }}>
        <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
          <li className="nav-item">
            <NavLink to={"/"} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/addwater_intake"} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              Add WaterIntake
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/listwater_intake"} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              View WaterIntake
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/differwater_intake"} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              Calculate WaterIntake Difference
            </NavLink>
          </li>
          {(user && location.pathname !== '/login') ? (
            <li className="nav-item">
              <span className="nav-link" onClick={handleLogout}>Logout</span>
            </li>
          ) : ''}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

