import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getAllUsers, sortUsers } from "../../features/UserF/userAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import AddNewUser from "../../component/AddNewUser";
import { useNavigate } from "react-router-dom";

function Users() {
  const { users } = useAppSelector((st: RootState) => st.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (sort: string) => {
    dispatch(sortUsers(sort));
  };

  return (
    <div className="forUserPage">
      <div className="forImage">
        <video className="backgroundVideo" autoPlay loop muted playsInline>
          <source src="/video/bgV.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="forUsers">
        <div className="sortButtons">
          <button onClick={() => handleSort("asc")} className="btn">
            Sort Ascending <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button onClick={() => handleSort("desc")} className="btn">
            Sort Descending <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className="forAddUser">
          <button onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>
        <div className="forUserss">
          {currentUsers.map((user: any) => (
            <div
              key={user.id}
              className="userCard"
              onClick={() => navigate("/users/" + user.id)}
            >
              <div className="userPic"></div>
              <h5>
                {user.name.firstname} {user.name.lastname}
              </h5>
              <p>Email: {user.email}</p>
              <p>
                City: {user.address.city} | Street: {user.address.street}
              </p>
              <span>Username: {user.username}</span>
            </div>
          ))}
        </div>
        <nav>
          <ul className="pagination ">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
              (_, index) => (
                <li key={index} className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
      {isModalOpen && <AddNewUser handleCloseModal={handleCloseModal} />}
    </div>
  );
}

export default Users;
