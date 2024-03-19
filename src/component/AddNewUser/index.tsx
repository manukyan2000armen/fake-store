import React from "react";
import { useForm } from "react-hook-form";
import { User } from "../../type";
import { useAppDispatch } from "../../app/hooks";
import { addNewUser } from "../../features/UserF/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

function AddNewUser({ handleCloseModal }: any) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();

  const addUser = (data: User) => {
    dispatch(addNewUser(data));
    console.log(data, "added");
    reset();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="forClose">
          <button onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <form onSubmit={handleSubmit(addUser)}>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="First-Name"
              {...register("name.firstname", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z]+$/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.name?.firstname && (
              <p className="text-danger">{errors.name.firstname.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Last-Name"
              {...register("name.lastname", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z]+$/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.name?.lastname && (
              <p className="text-danger">{errors.name.lastname.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              {...register("username", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z]+$/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z]+$/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Address|City"
              {...register("address.city", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z]+$/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.address?.city && (
              <p className="text-danger">{errors.address.city.message}</p>
            )}
          </div>

          <button className="btn btn-secondary">Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddNewUser;
