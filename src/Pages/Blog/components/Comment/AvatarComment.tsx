import React from 'react'
import { IUser } from '../../../../models/User';
import { Link } from 'react-router-dom';
interface IProps {
    user:IUser|null
}
const AvatarComment:React.FC<IProps> = ({user}) => {
  return (
    <div className="avatar_comment">
      <img src={user?.avatar} alt="avatar" />

      <small className="d-block text-break">
        <Link to={`/profile/${user?._id}`}>{user?.name}</Link>
      </small>
    </div>
  );
}

export default AvatarComment