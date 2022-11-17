import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";

const Posts = ({ userId }) => {
  const { isLoading, err, data } = useQuery(["posts"], () =>
    axiosInstance.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {err
        ? "Something went wrong"
        : isLoading
        ? "isLoading"
        : data?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;
