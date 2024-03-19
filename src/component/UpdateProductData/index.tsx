import React, { useEffect } from "react";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  getAllCategories,
  getSingleProduct,
  updateProduct,
} from "../../features/Product/productAPI";
import { Product } from "../../type";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function UpdateProductData({ id, handleCloseModal }: any) {
  const { product, categories } = useAppSelector(
    (st: RootState) => st.products
  );
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getSingleProduct(+params.id));
    }
    dispatch(getAllCategories());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>();

  const updateProductData = (data: Product) => {
    dispatch(updateProduct({ id, value: data }))
      .unwrap()
      .then(() => dispatch(getSingleProduct(id)));

    console.log(data, "updated data=>");
  };
  return (
    <div className="modal">
      <div className="modal-content ">
        <div className="forClose ">
          <button onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <form onSubmit={handleSubmit(updateProductData)}>
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
                return (
                  <option key={elm} value={elm}>
                    {elm}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="btn btn-secondary">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductData;
