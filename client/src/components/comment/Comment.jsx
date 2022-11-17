/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comment.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";
import moment from "moment";

const Comment = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const { isLoading, err, data } = useQuery(["comments"], () =>
    axiosInstance.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return axiosInstance.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleComment = async () => {
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  const handleSendOnClick = (e) => {
    e.preventDefault();
    handleComment();
  };

  const handleSendOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleComment();
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePicture} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          onKeyDown={handleSendOnEnter}
        />
        <button onClick={handleSendOnClick}>Send</button>
      </div>
      {isLoading
        ? "loading..."
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={"/upload/" + comment.profilePicture} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comment;
