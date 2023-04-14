import React, { useState } from "react";
import { IComment } from "../../../../models/Comments";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import Input from "./Input";
import {
  deleteCommentAC,
  deleteReplyAC,
  replyCommentAC,
  updateCommentAC,
  updateReplyAC,
} from "../../../../Global/comment/action";
import CommentNav from "./CommentNav";
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
  const dispatch = useAppDispatch();
  const { isAuth, user, accessToken } = useAppSelector(
    (state) => state.authReducer
  );
  const [edit, setEdit] = useState<IComment>();

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
    setShowReply([data, ...showReply]);
    dispatch(replyCommentAC(data));

    setOnReply(false);
  };

  const handleUpdate = (body: string) => {
    if (!user || !accessToken || !edit) return;

    if (body === edit.content) return setEdit(undefined);

    const newComment = { ...edit, content: body };
    newComment.comment_root
      ? dispatch(updateReplyAC(newComment))
      : dispatch(updateCommentAC(newComment));
    
    setEdit(undefined);
  };

    const handleDelete = (comment: IComment) => {
      if (!user || !accessToken) return;
      console.log('hello')
      comment.comment_root?dispatch(deleteReplyAC(comment)):dispatch(deleteCommentAC(comment));
    };
  return (
    <div className="w-100">
      {edit ? (
        <Input callback={handleUpdate} edit={edit} setEdit={setEdit} />
      ) : (
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

            <small className="d-flex">
              <div className="comment_nav">
                {comment.blog_user_id === user?._id ? (
                  comment.user?._id === user._id ? (
                    <CommentNav
                      comment={comment}
                      setEdit={setEdit}
                      handleDelete={handleDelete}
                    />
                  ) : (
                    <i
                      className="fas fa-trash-alt mx-2"
                      onClick={() => {
                        handleDelete(comment);
                      }}
                    />
                  )
                ) : (
                  comment?.user?._id === user?._id && (
                    <CommentNav
                      comment={comment}
                      setEdit={setEdit}
                      handleDelete={handleDelete}
                    />
                  )
                )}
              </div>

              <div>{new Date(comment.createdAt).toLocaleString()}</div>
            </small>
          </div>
        </div>
      )}

      {onReply && <Input callback={handleReply} />}

      {children}
    </div>
  );
};

export default CommentList;
