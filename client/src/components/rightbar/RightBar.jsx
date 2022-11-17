/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./rightbar.scss";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const RightBar = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, err, data } = useQuery(["users"], () =>
    axiosInstance.get("/users").then((res) => {
      return res.data;
    })
  );

  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate(`/profile/${userId}`);
    window.location.reload();
  };

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleStatusChange);

    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {isLoading
            ? "Loading"
            : data.map((user) => (
                <div
                  className="user"
                  key={user.id}
                  style={{ display: user.id === currentUser.id && "none" }}
                >
                  <div className="userInfo">
                    <img src={"/upload/" + user.profilePicture} alt="" />
                    <span>{user.name}</span>
                  </div>
                  <div className="buttons">
                    <button onClick={() => handleClick(user.id)}>
                      Profile page
                    </button>
                  </div>
                </div>
              ))}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://khoinguonsangtao.vn/wp-content/uploads/2022/06/hinh-avatar-hai-khuon-mat-kho-do-cua-chu-meo.jpg"
                alt=""
              />
              <p>
                <span>Lucas</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://khoinguonsangtao.vn/wp-content/uploads/2022/06/hinh-avatar-hai-khuon-mat-kho-do-cua-chu-meo.jpg"
                alt=""
              />
              <p>
                <span>Andrew</span> liked a post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://khoinguonsangtao.vn/wp-content/uploads/2022/06/hinh-avatar-hai-khuon-mat-kho-do-cua-chu-meo.jpg"
                alt=""
              />
              <p>
                <span>Mathew</span> liked a comment
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://khoinguonsangtao.vn/wp-content/uploads/2022/06/hinh-avatar-hai-khuon-mat-kho-do-cua-chu-meo.jpg"
                alt=""
              />
              <p>
                <span>Tony</span> posted a new photo
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Status</span>
          {isLoading
            ? "Loading"
            : data.map((user) => (
                <div className="user" key={user.id}>
                  <div className="userInfo">
                    <img src={"/upload/" + user.profilePicture} alt="" />
                    <div
                      className={
                        isOnline && user.id === currentUser.id
                          ? "online"
                          : "offline"
                      }
                    ></div>
                    <span>{user.name}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
