import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import CardVert from "../../components/cards/CardVert";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getHomeBlogsAC } from "../../Global/blog/action";
import HomeSkeleton from "./components/HomeSkeleton";

const getResponsiveFallbackCount = () => {
  if (typeof window === "undefined") return 8;
  if (window.innerWidth < 576) return 4;
  if (window.innerWidth < 992) return 6;
  return 8;
};

const Home = () => {
  const { homeBlogs, newBlog, homeLoading, homeError } = useAppSelector(
    (state) => state.blogReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHomeBlogsAC());
  }, [dispatch, newBlog]);

  const totalLoadedBlogs = homeBlogs.reduce(
    (sum, group) => sum + group.blogs.length,
    0
  );

  const skeletonCount =
    totalLoadedBlogs > 0
      ? Math.max(Math.min(totalLoadedBlogs, 12), 4)
      : getResponsiveFallbackCount();

  if (homeLoading) {
    return (
      <div className="home_page">
        <HomeSkeleton count={skeletonCount} />
      </div>
    );
  }

  if (homeError) {
    return (
      <div className="home_page">
        <div className="home_error">
          <p className="mb-2">{homeError}</p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => dispatch(getHomeBlogsAC())}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!homeBlogs.length) {
    return (
      <div className="home_page">
        <div className="home_empty">No blogs found.</div>
      </div>
    );
  }

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
