import {useState,useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IParams } from '../../models/Params';
import {  useParams,useLocation } from 'react-router-dom';
import { IBlog } from '../../models/Blog';
import Loading from '../../components/alert/Loading';
import { getBlogDetail } from '../../services/blogService';
import { showErrMsg } from '../../components/alert/Alert';
import DisplayBlog from './components/DisplayBlog';

const Blog = () => {

  const dispatch = useAppDispatch();
  const {socket} = useAppSelector(state=>state.socketReducer)
  const {id} = useParams<IParams>();

  const [blog, setBlog] = useState<IBlog>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);

      getBlogDetail(id).then((res) => {
            console.log(res.data)
            setBlog(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.response.data.msg);
            setLoading(false);
          });

    return () => setBlog(undefined);
  }, [id]);
  
  //join room
  useEffect(() => {
        if (!id || !socket) return;
    socket.emit('joinRoom', id);

    return () => {
      socket.emit('outRoom',id)
    }
  },[socket,id])
  
  if (loading) return <Loading />;
  return (
    <div className="my-4">
      {error && showErrMsg(error)}

      {blog && <DisplayBlog blog={blog} />}
    </div>
  );
}

export default Blog