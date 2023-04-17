import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { IComment } from "./models/Comments";
import {commentAction} from './Global/comment/slice'

const SocketClient = () => {
 const {socket} = useAppSelector(state => state.socketReducer)
  const dispatch = useAppDispatch();

  // Create Comment
  useEffect(() => {
    if (!socket) return;

      socket.on("createComment", (data: IComment) => {
        dispatch(commentAction.createCommentAction(data))

    });

    return () => {
      socket.off("createComment");
    };
  }, [socket, dispatch]);

  // Reply Comment
  useEffect(() => {
    if (!socket) return;

      socket.on("replyComment", (data: IComment) => {
          dispatch(commentAction.replyCommentAction(data))

    });

    return () => {
      socket.off("replyComment");
    };
  }, [socket, dispatch]);

  // Update Comment
  useEffect(() => {
    if (!socket) return;

      socket.on("updateComment", (data: IComment) => {
         data.comment_root
           ? dispatch(commentAction.updateReplyAction(data))
           : dispatch(commentAction.updateCommentAction(data));
   
    });

    return () => {
      socket.off("updateComment");
    };
  }, [socket, dispatch]);

  // Delete Comment
  useEffect(() => {
    if (!socket) return;

    socket.on("deleteComment", (data: IComment) => {
        data.comment_root
          ? dispatch(commentAction.deleteReplyAction(data))
          : dispatch(commentAction.deleteCommentAction(data));
    });

    return () => {
      socket.off("deleteComment");
    };
  }, [socket, dispatch]);

  return <div></div>;
};

export default SocketClient;
