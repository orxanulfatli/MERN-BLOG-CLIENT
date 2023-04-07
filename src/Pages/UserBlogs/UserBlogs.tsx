import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/alert/Loading'
import CardHoriz from '../../components/cards/CardHoriz'
import Pagination from '../../components/Pagination'
import { getBlogsByUserAC } from '../../Global/blog/action'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IBlog } from '../../models/Blog'
import { IParams } from '../../models/Params'
import NotFound from '../NotFound/NotFound'

const UserBlogs = () => {
  const {userBlogs} = useAppSelector(state =>state.blogReducer)
  const dispatch = useAppDispatch();

  const { id } = useParams<IParams>();
  const [blogs, setBlogs] = React.useState<IBlog[]>()
  const [total, setTotal] = React.useState(0)
  
  const { search } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!id) return;

    if (userBlogs.every((item) => item.id !== id)) {
      dispatch(getBlogsByUserAC({ id, search }));
    } else {
      const data = userBlogs.find((item) => item.id === id);
      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);
      if (data.search) navigate(data.search);
    }
  }, [id, userBlogs, search,navigate,dispatch]);

   const handlePagination = (num: number) => {
     const search = `?page=${num}`;
     if (id) {
       dispatch(getBlogsByUserAC({ id, search }));
     }
   };
    if (!blogs) return <Loading />;

    if (blogs.length === 0) return <h3 className="text-center">No Blogs</h3>;
  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <CardHoriz key={blog._id} blog={blog} />
        ))}
      </div>

      <div>
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </div>
  );
}

export default UserBlogs