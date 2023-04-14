import React,{useState} from 'react'
import { IComment } from '../../../../models/Comments';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import Input from './Input';
import { replyCommentAC } from '../../../../Global/comment/action';
interface IProps {
  children?: React.ReactNode;

  comment: IComment;
  showReply: IComment[];
  setShowReply: (showReply: IComment[]) => void;
}

const CommentList: React.FC<IProps> = ({
  comment,
  showReply,
  setShowReply,
  children,
}) => {
  const [onReply, setOnReply] = useState(false);
  const dispatch = useAppDispatch()
  const { isAuth, user } = useAppSelector((state) => state.authReducer);

  const handleReply = (body: string) => {
    if (!isAuth || !user) return;
    const data = {
      user: user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString(),
    };
        console.log(data);
    setShowReply([data,...showReply ]);
        dispatch(replyCommentAC(data));

        setOnReply(false);
  };

  return (
    <div className="w-100">
      <div className="comment_box">
        <div
          className="p-2"
          dangerouslySetInnerHTML={{
            __html: comment.content,
          }}
        />

        <div className="d-flex justify-content-between p-2">
          <small
            style={{ cursor: "pointer" }}
            onClick={() => setOnReply(!onReply)}
          >
            {onReply ? "- Cancel -" : "- Reply -"}
          </small>

          <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      </div>

      {onReply && <Input callback={handleReply} />}

      {children}
    </div>
  );
};

export default CommentList