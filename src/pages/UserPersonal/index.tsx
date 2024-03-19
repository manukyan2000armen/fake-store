import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getSingleUser } from "../../features/UserF/userAPI";
import UpdateUserData from "../../component/UpdateUserData";

function UserPersonal() {
  const { user } = useAppSelector((st: RootState) => st.users);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();

  const openClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (params.id) {
      dispatch(getSingleUser(+params.id));
    }
  }, []);
  return (
    <div className="userPersonalPage">
      <div className="userPersonalCard">
        <div className="userDelBtn">
          <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
        </div>
        <div className="userPic"></div>
        <h5>
          {user?.name?.firstname} {user?.name?.lastname}
        </h5>
        <p>Email: {user.email}</p>
        <p>City: {user?.address?.city}</p>
        <p>Street: {user?.address?.street}</p>
        <span>Username: {user.username}</span>
      </div>

      <button className="btnUserUpdate" onClick={openClick}>
        Update User Data
      </button>
      {isOpen && <UpdateUserData closeClick={closeClick} />}
    </div>
  );
}

export default UserPersonal;
