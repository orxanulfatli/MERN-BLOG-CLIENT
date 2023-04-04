import React, { useEffect, useState } from "react";
import "./BlogsByCategory.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/alert/Loading";
import CardVert from "../../components/cards/CardVert";
import { getBlogsByCategoryAC } from "../../Global/blog/action";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IBlog } from "../../models/Blog";
import { IParams } from "../../models/Params";
import Pagination from "../../components/Pagination";

const BlogsByCategory = () => {
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const { categoryBlogs } = useAppSelector((state) => state.blogReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams<IParams>();
  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0)
  const { search } = useLocation()
  const navigate = useNavigate()
  console.log(total)
  useEffect(() => {
    const category = categories.find((category) => category.name === id);
    if (category) setCategoryId(category?._id);
  }, [id, categories]);

  useEffect(() => {
    if (!categoryId) return;
    let isNotRepeated = categoryBlogs.every(
      (category) => category.id !== categoryId
    );
    if (isNotRepeated) {
      dispatch(getBlogsByCategoryAC({categoryId,search}));
    }
    else {
      const data = categoryBlogs.find((item) => item.id === categoryId);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total)
      if (data.search) navigate(data.search);

    }
  }, [categoryId, categoryBlogs,search,navigate]);

    const handlePagination = (num: number) => {
      const search = `?page=${num}`;
      dispatch(getBlogsByCategoryAC({categoryId, search}));
    };
  if (!blogs) return <Loading />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>

      {total > 1 && <Pagination total={total} callback={handlePagination} />}
    </div>
  );
};

export default BlogsByCategory;
