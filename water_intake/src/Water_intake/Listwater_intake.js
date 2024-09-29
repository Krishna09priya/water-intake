import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteWater_Intake } from "../store/water_intakeSlice";
import Navbar from "../Navbar";
import checkAuth from "../components/Auth/checkAuth";

function Listwater_intake() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userWater_intakes = useSelector((state) => state.water_intakes.userWater_intakes[user?.userId] || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleDeleteItem = (itemId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this entry?');
    if (isConfirmed) {
      dispatch(deleteWater_Intake({ userId: user?.userId, water_intakeId: itemId }));
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userWater_intakes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userWater_intakes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
          <h2 className="my-3 text-success">Water Intake Records for {user?.username || "User"}</h2>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Quantity</th>
                <th>Added Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item?.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item?.quantity} litre</td>
                  <td>  {new Intl.DateTimeFormat('en-GB', {day: '2-digit',month: 'long',year: 'numeric',timeZone: 'UTC', }).format(new Date(item?.addedtime))}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => navigate(`/editwater_intake/${item.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteItem(item?.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a onClick={() => currentPage > 1 && paginate(currentPage - 1)} href="#!" className="page-link">
              Previous
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <a onClick={() => paginate(index + 1)} href="#!" className="page-link">
                {index + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a onClick={() => currentPage < totalPages && paginate(currentPage + 1)} href="#!" className="page-link">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default checkAuth(Listwater_intake);
