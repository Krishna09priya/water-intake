import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import checkAuth from '../components/Auth/checkAuth';

const WaterIntakeDifference = () => {
  const user = useSelector((state) => state.auth.user);
  const userWaterIntakes = useSelector((state) => state.water_intakes.userWater_intakes[user?.userId] || []);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [difference, setDifference] = useState(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      setDifference('Please select both start and end dates.');
      return;
    }

    const start = new Date(startDate).toISOString().split('T')[0];
    const end = new Date(endDate).toISOString().split('T')[0];

    const startIntake = userWaterIntakes.find(intake => intake.addedtime.split('T')[0] === start);
    const endIntake = userWaterIntakes.find(intake => intake.addedtime.split('T')[0] === end);

    if (!startIntake || !endIntake) {
      setDifference('No water intake data available for one or both selected dates.');
      return;
    }

    const intakeDifference = parseFloat(endIntake.quantity) - parseFloat(startIntake.quantity);
    if (intakeDifference < 0) {
      setDifference(`You drank ${Math.abs(intakeDifference).toFixed(2)} liters less water on ${endDate} compared to ${startDate}.`);
    } else if (intakeDifference > 0) {
      setDifference(`You drank ${intakeDifference.toFixed(2)} liters more water on ${endDate} compared to ${startDate}.`);
    } else {
      setDifference(`Your water intake was the same on ${startDate} and ${endDate}.`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Find Water Intake Difference Between Two Dates</h2>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={calculateDifference}>
          Calculate Difference
        </button>
        {difference && <div className="alert alert-success">{difference}</div>}
      </div>
    </div>
  );
};

export default checkAuth(WaterIntakeDifference);
