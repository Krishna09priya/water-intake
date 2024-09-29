import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../Navbar';
import '../../Register.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    const activeUser = users.find(user => user.active);
    if (activeUser) {
      navigate('/addwater_intake');
    }
  }, [users, navigate]);

  const handleLogin = () => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      dispatch(setActiveUser(user));
      navigate('/addwater_intake');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
        <h6 className='inf'>Not registered?<Link to="/" > Create an account </Link></h6>
      </div>
    </div>
  );
};

export default Login;

