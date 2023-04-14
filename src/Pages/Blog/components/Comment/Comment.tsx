import React, { useEffect, useState } from 'react';
import './Comment.css'
import AvatarComment from './AvatarComment';
import CommentList from './CommentList';
import { IComment } from '../../../../models/Comments';
import AvatarReply from './AvatarReplay';

interface IProps {
  comment:IComment
}
const Comment: React.FC<IProps> = ({ comment }) => {
  const [showReply, setShowReply] = useState<IComment[]>([]);
    const [next, setNext] = useState(2);


    useEffect(() => {
      if (!comment.replyCM) return;
      setShowReply(comment.replyCM);
    }, [comment.replyCM]);
  return (
    <div
      className="my-3 d-flex"
      style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "initial" : "none",
      }}
    >
      <AvatarComment user={comment.user} />
      <CommentList
        comment={comment}
        showReply={showReply}
        setShowReply={setShowReply}
      >
        {showReply.slice(0, next).map((comment, index) => (
          <div
            key={index}
            style={{
              opacity: comment._id ? 1 : 0.5,
              pointerEvents: comment._id ? "initial" : "none",
            }}
          >
            <AvatarReply user={comment.user} reply_user={comment.reply_user} />

            <CommentList
              comment={comment}
              showReply={showReply}
              setShowReply={setShowReply}
            />
          </div>
        ))}

        <div style={{ cursor: "pointer" }}>
          {showReply.length - next > 0 ? (
            <small
              style={{ color: "crimson" }}
              onClick={() => setNext(next + 5)}
            >
              See more comments...
            </small>
          ) : (
            showReply.length > 2 && (
              <small style={{ color: "teal" }} onClick={() => setNext(2)}>
                Hide comments...
              </small>
            )
          )}
        </div>
      </CommentList>
    </div>
  );
}

export default Comment