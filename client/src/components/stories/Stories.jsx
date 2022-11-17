import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    axiosInstance.get("/stories").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePicture} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((s) => (
            <div className="story" key={s.id}>
              <img src={s.img} alt="" />
              <span>{s.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
