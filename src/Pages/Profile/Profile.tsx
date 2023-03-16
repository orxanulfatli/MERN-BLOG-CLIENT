
import './Profile.css'
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux'
import { IParams } from '../../models/Params';
import UserBlogs from '../UserBlogs/UserBlogs';
import OtherInfo from './components/OtherInfo';
import UserInfo from './components/UserInfo';

const Profile = () => {
    const { user } = useAppSelector(state => state.authReducer)
  const { id } = useParams<IParams>()
    return (
      <div className="row my-3">
        <div className="col-md-5 mb-3">
          {user?._id === id ? <UserInfo /> : <OtherInfo />}
        </div>

        <div className="col-md-7">
          <UserBlogs />
        </div>
      </div>
    );
}

export default Profile