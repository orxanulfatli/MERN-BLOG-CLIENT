import { useEffect, useState, useRef } from "react";
import "./Category.css";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createCategoryAC,
  deleteCategoryAC,
  getCategoriesAC,
  updateCategoryAC,
} from "../../Global/category/action";
import { ICategory } from "../../models/Category";

const Category = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const [edit, setEdit] = useState<ICategory | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const initState = { category: "" };

  const onSubmit = (data: { category: string }) => {
    if (edit) {
      if (data.category === edit.name) return;
      dispatch(updateCategoryAC({ ...edit, name: formData.category }));
      setEdit(null);
    } else {
      dispatch(createCategoryAC({ name: data.category }));
    }
  };
  const { formData, handleChange, handleSubmit, errors, setFormData } = useForm(
    initState,
    onSubmit
  );

  const handleDelete = (id:string) => {
    dispatch(deleteCategoryAC({id}))
  }

  useEffect(() => {
    if (edit) {
      setFormData({ category: edit.name });
      inputRef.current?.focus();
    }
  }, [edit]);

  useEffect(() => {
    dispatch(getCategoriesAC());
  }, []);
  return (
    <div className="category">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>

        <div className="d-flex align-items-center">
          {edit && (
            <i
              className="fas fa-times me-2 text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => setEdit(null)}
            />
          )}
          <input
            ref={inputRef}
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          />

          <button type="submit">{edit ? "Update" : "Create"}</button>
        </div>
      </form>

      <div>
        {categories.map((category) => (
          <div className="category_row" key={category._id}>
            <p className="m-0 text-capitalize">{category.name}</p>

            <div>
              <i
                className="fas fa-edit mx-2"
                onClick={() => {
                  setEdit(category);
                }}
              />
              <i className="fas fa-trash-alt"
              onClick={()=>{handleDelete(category._id)}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
