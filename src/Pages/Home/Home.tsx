import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import CardVert from "../../components/cards/CardVert";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getHomeBlogsAC } from "../../Global/blog/action";

const Home = () => {
  const { homeBlogs, newBlog } = useAppSelector((state) => state.blogReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getHomeBlogsAC());
  }, [newBlog]);
  return (
    <div className="home_page">
      {homeBlogs.map((homeBlog) => (
        <div key={homeBlog._id}>
          {homeBlog.count > 0 && (
            <>
              <h3>
                <Link to={`/blogs/${homeBlog.name.toLowerCase()}`}>
                  {homeBlog.name} <small>({homeBlog.count})</small>
                </Link>
              </h3>
              <hr className="mt-1" />

              <div className="home_blogs">
                {homeBlog.blogs.map((blog) => (
                  <CardVert key={blog._id} blog={blog} />
                ))}
              </div>
            </>
          )}

          {homeBlog.count > 4 && (
            <Link
              className="text-end d-block mt-2 mb-3"
              to={`/blogs/${homeBlog.name}`}
            >
              Read more &gt;&gt;
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
