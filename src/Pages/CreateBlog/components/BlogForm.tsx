import React from "react";
import TextErrors from "../../../components/TextErrors";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IBlog } from "../../../models/Blog";
import { InputChange } from "../../../utils/types";

interface IProps {
  blog: IBlog;
    handleChange: (e: InputChange) => void;
    errors:any
}
const BlogForm: React.FC<IProps> = ({ blog,errors, handleChange }) => {
  const { categories } = useAppSelector((state) => state.categoryReducer);
  return (
    <form>
      <div className="form-group position-relative">
        <input
          type="text"
          className="form-control"
          value={blog.title}
          name="title"
          onChange={handleChange}
        />

        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.title.length}/50
        </small>
      </div>
      <TextErrors error={errors.title} />
      <div className="form-group my-3">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          name="thumbnail"
          onChange={handleChange}
        />
      </div>
      <TextErrors error={errors.thumbnail} />

      <div className="form-group position-relative">
        <textarea
          className="form-control"
          rows={4}
          value={blog.description}
          style={{ resize: "none" }}
          name="description"
          onChange={handleChange}
        />

        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.description.length}/200
        </small>
      </div>
      <TextErrors error={errors.description} />

      <div className="form-group my-3">
        <select
          className="form-control text-capitalize"
          value={blog.category}
          name="category"
          onChange={handleChange}
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <TextErrors error={errors.category} />
    </form>
  );
};

export default BlogForm;
