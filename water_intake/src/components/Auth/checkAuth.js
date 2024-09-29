import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveUser } from "../../store/authSlice";

export const checkAuth = (Component) => {
  function Wrapper(props) {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        // Retrieve users array from local storage
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        if (storedUsers) {
          // Find the active user
          const activeUser = storedUsers.find(user => user.active === true);
          if (activeUser) {
            dispatch(setActiveUser(activeUser));
          } else {
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      }
    }, [user, navigate, dispatch]);

    return user ? <Component {...props} /> : null; // Only render the component if the user is authenticated
  }

  return Wrapper;
}

export default checkAuth;



