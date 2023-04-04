import React from 'react'
import Loading from '../../../components/alert/Loading'
import { getOtherInfoAC } from '../../../Global/profile/action'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { IUser } from '../../../models/User'


interface IProps {
  id:string|undefined
}
const OtherInfo: React.FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const {otherUser,isLoading} = useAppSelector(state => state.profileReducer)
  const [other,setOther] = React.useState<IUser>()
  React.useEffect(() => {
    if (!id) return;
    console.log(otherUser?.every((user) => user._id !== id));
    if (otherUser.every((user) => user._id !== id)) {
      dispatch(getOtherInfoAC(id));
    } else {
      const newUser = otherUser?.find((user) => user._id === id)
      if(newUser) setOther(newUser);

    }
  }, [id,otherUser,dispatch])
  
  if(isLoading) <Loading/>
  if(!other) return <></>
  return (
    <div className="profile_info text-center rounded">
      <div className="info_avatar">
        <img src={other.avatar} alt="avatar" />
      </div>

      <h5 className="text-uppercase text-danger">{other.role}</h5>

      <div>
        Name: <span className="text-info">{other.name}</span>
      </div>

      <div>Email / Phone number</div>
      <span className="text-info">{other.account}</span>

      <div>
        Join Date:{" "}
        <span style={{ color: "#ffc107" }}>
          {new Date(other.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default OtherInfo