import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkAuth from "../components/Auth/checkAuth";
import Navbar from '../Navbar';
import {addWater_Intake } from "../store/water_intakeSlice";
import { useNavigate } from "react-router-dom";

function Addwater_intake() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userWater_intakes = useSelector((state) => state.water_intakes.userWater_intakes[user?.userId] || []);

  const [waterIntake, setWaterIntake] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    setWaterIntake(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      setErrorMessage("You need to be logged in to add water-intake.");
      return;
    }

    if (!user.active) {
      setErrorMessage("You need to be an active user to add water-intake.");
      return;
    }

    const currentDate = new Date();
    const ISTDate = new Date(currentDate.getTime() + (330 * 60 * 1000));
    const localToday = `${ISTDate.getUTCFullYear()}-${String(ISTDate.getUTCMonth() + 1).padStart(2, '0')}-${String(ISTDate.getUTCDate()).padStart(2, '0')}`;

    const hasEntryForToday = userWater_intakes.some(
      (entry) => new Date(entry.addedtime).toISOString().split('T')[0] === localToday
    );

    if (!hasEntryForToday) {
      const newWaterIntake = {
        quantity: waterIntake,
        id: Date.now(),
        addedtime: ISTDate.toISOString(),
      };
      dispatch(addWater_Intake({ userId: user.userId, water_intake: newWaterIntake }));
      navigate('/listwater_intake');
      setWaterIntake("");
      setErrorMessage("");
    } else {
      setErrorMessage("You can only add one water-intake per day."); 
      setMessage("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Add New Water-Intake</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Enter Today's Water-Intake</label>
                <input
                  type="text"
                  value={waterIntake}
                  className="form-control"
                  placeholder="quantity in litre"
                  onChange={handleNameChange}
                />
              </div>
              <div className="form-group">
                <button className="btn" type="submit">Add</button>
              </div>
            </form>
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Addwater_intake);
