import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../type";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addNewProduct,
  getAllCategories,
} from "../../features/Product/productAPI";
import { RootState } from "../../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

interface ProductModalProps {
  handleCloseModal: () => void;
}

function AddProductModal({ handleCloseModal }: ProductModalProps) {
  const { categories } = useAppSelector((st: RootState) => st.products);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const save = (data: Product) => {
    dispatch(addNewProduct(data));
    handleCloseModal();
    // console.log(data, "added data");
  };
  return (
    <div className="modal">
      <div className="modal-content ">
        <div className="forClose ">
          <button onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <form onSubmit={handleSubmit(save)}>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              {...register("title", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z]+$/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              {...register("price", {
                required: "Fill in the field",
                pattern: {
                  value: /[0-9]+$/,
                  message: "Fill in the numbers",
                },
              })}
            />
            {errors.price && (
              <p className="text-danger">{errors.price.message}</p>
            )}
          </div>

          <div>
            <textarea
              className="form-control"
              placeholder="Description"
              {...register("description", {
                required: "Fill in the field",
                pattern: {
                  value: /[a-zA-Z]+$/,
                  message: "Fill in the letters",
                },
              })}
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>

          <div>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              {...register("image", {
                required: "Please select an image",
              })}
            />
            {errors.image && (
              <p className="text-danger">{errors.image.message}</p>
            )}
          </div>
          <div>
            <select {...register("category")} className="form-control">
              <option value="" hidden>
                Select Category
              </option>
              {categories?.map((elm: any) => {
                return <option key={elm}>{elm}</option>;
              })}
            </select>
          </div>
          <button className="btn btn-secondary">Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
