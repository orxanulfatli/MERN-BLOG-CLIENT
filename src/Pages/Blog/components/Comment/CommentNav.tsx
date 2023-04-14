import React from 'react'
import { IComment } from '../../../../models/Comments';


interface IProps {
    setEdit: (comment: IComment) => void
    comment: IComment
    handleDelete:(comment:IComment)=>void
}
const CommentNav:React.FC<IProps> = ({setEdit,comment,handleDelete}) => {
  return (
    <div>
      <i className="fas fa-trash-alt mx-2" onClick={()=>{handleDelete(comment)}} />
      <i className="fas fa-edit me-2" onClick={() => setEdit(comment)} />
    </div>
  );
}

export default CommentNav