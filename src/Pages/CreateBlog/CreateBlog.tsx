import React, { useEffect, useState } from "react";
import "./CreateBlog.css";
import { useForm } from "../../hooks/useForm";
import { IBlog } from "../../models/Blog";
import BlogForm from "./components/BlogForm";
import CardHoriz from "../../components/cards/CardHoriz";
import ReactQuill from "../../components/editor/ReactQuill";
import { validateBlog } from "../../utils/validate";
import TextErrors from "../../components/TextErrors";
import { useAppDispatch } from "../../hooks/redux";
import { createBlogAC } from "../../Global/blog/action";

const CreateBlog = () => {
  const dispatch = useAppDispatch();
  const initialState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };

  const [body, setBody] = useState("");

  const onSubmit = (blog: IBlog) => {
    dispatch(createBlogAC(blog));
    setBody("");
  };

  const { formData, handleChange, handleSubmit, errors, setFormData } = useForm(
    initialState,
    onSubmit,
    validateBlog
  );

  useEffect(() => {
    if (body) {
      setFormData({ ...formData, content: body });
    }
  }, [body]);

  return (
    <div className="my-4 create_blog">
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Create</h5>
          <BlogForm
            blog={formData}
            errors={errors}
            handleChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <h5>Preview</h5>
          <CardHoriz blog={formData} />
        </div>
      </div>

      <ReactQuill setBody={setBody} />
      <small>{body.length}</small>
      <TextErrors error={errors.content} />
      <button
        className="btn btn-dark mt-3 d-block mx-auto"
        onClick={handleSubmit}
      >
        Create Post
      </button>
    </div>
  );
};

export default CreateBlog;
