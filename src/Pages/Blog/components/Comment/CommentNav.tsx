import React from 'react'
import { IComment } from '../../../../models/Comments';


interface IProps {
    setEdit: (comment: IComment) => void
    comment:IComment
}
const CommentNav:React.FC<IProps> = ({setEdit,comment}) => {
  return (
    <div>
      <i className="fas fa-trash-alt mx-2" />
      <i className="fas fa-edit me-2" onClick={() => setEdit(comment)} />
    </div>
  );
}

export default CommentNav