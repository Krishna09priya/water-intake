import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { updateWater_Intake } from "../store/water_intakeSlice";
import checkAuth from "../components/Auth/checkAuth";

function Editwater_intake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userWater_intakes = useSelector((state) => state.water_intakes.userWater_intakes[user?.userId] || []);
  
  const [waterIntake, setWaterIntake] = useState({ id: '', quantity: '', addedtime: '' });

  useEffect(() => {
    const water = userWater_intakes.find(item => item.id === parseInt(id));
    if (water) {
      setWaterIntake(water);
    }
  }, [id, userWater_intakes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWaterIntake(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateWater_Intake({ userId: user.userId, water_intake: waterIntake }));
    navigate('/listwater_intake');
  };

  const cardStyle = {
    maxWidth: '400px', 
    margin: 'auto',  
    padding: '20px', 
    borderRadius: '10px'
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card" style={cardStyle}>
          <div className="card-body bg-light">
            <h2 className="card-title">Update Water-Intake</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Water-Intake for updating</label>
                <input
                  type="text"
                  name="quantity"
                  value={waterIntake.quantity || ''}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Editwater_intake);


