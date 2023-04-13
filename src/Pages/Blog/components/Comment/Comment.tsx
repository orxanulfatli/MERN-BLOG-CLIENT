import React from 'react';
import './Comment.css'
import AvatarComment from './AvatarComment';
import CommentList from './CommentList';
import { IComment } from '../../../../models/Comments';

interface IProps {
  comment:IComment
}
const Comment:React.FC<IProps> = ({comment}) => {
  return (
    <div className="my-3 d-flex" style={{
      opacity: comment._id ? 1 : 0.5,
      pointerEvents: comment._id ? 'initial' : 'none'
    }}>
      <AvatarComment user={comment.user} />

      <CommentList comment={comment} />
    </div>
  );
}

export default Comment