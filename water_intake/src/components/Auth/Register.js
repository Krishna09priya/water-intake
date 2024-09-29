import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addUser } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../Navbar';
import '../../Register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const users = useSelector((state) => state.auth.users);

  const handleRegister = () => {
    const highestUserId = users.length > 0 ? Math.max(...users.map(user => user.userId)) : 0;
    const newUserId = highestUserId + 1;
    const newUser = {
      userId: newUserId, // A unique user ID
      username,
      email,
      password,
      active: false
    };

    dispatch(addUser(newUser));
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Register</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
              <button className="btn" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
        <h6 className='inf'>Already registered?<Link to="/login" > Login here </Link></h6>
      </div>
    </div>
  );
};

export default Register;
