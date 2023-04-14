import React, { useEffect, useState } from "react";
import { IBlog } from "../../../models/Blog";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Input from "./Comment/Input";
import { Link, useLocation } from "react-router-dom";
import { IComment } from "../../../models/Comments";
import { IUser } from "../../../models/User";
import Comment from "./Comment/Comment";
import { createCommentAC, getCommentsAC } from "../../../Global/comment/action";
import { getComments } from "../../../services/commentsService";
import EasyLoading from "../../../components/EasyLoading";
import Pagination from "../../../components/Pagination";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isLoading, comments,total } = useAppSelector(
    (state) => state.commentReducer
  );
  const { isAuth, user, accessToken } = useAppSelector(
    (state) => state.authReducer
  );

  const [showComments, setShowComments] = useState<IComment[]>([]);

  const handleComment = (body: string) => {
    if (!isAuth || !accessToken) return;

    const data = {
      content: body,
      user: user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      createdAt: new Date().toISOString(),
    };
    setShowComments([data, ...showComments]);
    dispatch(createCommentAC(data));
  };

  useEffect(() => {
    if (comments.length === 0) return;
    setShowComments(comments);
  }, [comments]);

  useEffect(() => {
    if (!blog._id) return;
    const num = location.search.slice(6) || 1;
    dispatch(getCommentsAC({id:blog._id,num}))
  },[blog._id])


    const handlePagination = (num: number) => {
      if (!blog._id) return;
    dispatch(getCommentsAC({id:blog._id,num}));
    };
  return (
    <div>
      <h2
        className="text-center my-3 text-capitalize fs-1"
        style={{ color: "#ff7a00" }}
      >
        {blog.title}
      </h2>

      <div className="text-end fst-italic" style={{ color: "teal" }}>
        <small>
          {typeof blog.user !== "string" && `By: ${blog.user.name}`}
        </small>

        <small className="ms-2">
          {new Date(blog.createdAt).toLocaleString()}
        </small>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />

      <hr className="my-1" />
      <h3 style={{ color: "#ff7a00" }}>✩ Comments ✩</h3>

      {isAuth ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          Please{" "}
          <Link to={`/login`} state={{ from: location }}>
            login
          </Link>{" "}
          to comment.
        </h5>
      )}

      {isLoading ? (
        <EasyLoading />
      ) : (
        showComments?.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))
      )}

      {total > 1 && (
        <Pagination total={total} callback={handlePagination} />
      )}
    </div>
  );
};

export default DisplayBlog;
