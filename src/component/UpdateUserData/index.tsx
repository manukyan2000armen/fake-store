import React from "react";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getSingleUser, updateUserData } from "../../features/UserF/userAPI";
import { User } from "../../type";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function UpdateUserData({ id, closeClick }: any) {
  const { user } = useAppSelector((st: RootState) => st.users);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();
  const dispatch = useAppDispatch();

  const updateData = (data: User) => {
    dispatch(updateUserData({ id, value: data }))
      .unwrap()
      .then(() => dispatch(getSingleUser(id)));
    reset();
  };
  return (
    <div className="update">
      <div className="forClose">
        <button onClick={closeClick}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <form onSubmit={handleSubmit(updateData)}>
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
  );
}

export default UpdateUserData;
