import "./navbar.scss";
import {
  HomeOutlined,
  WbSunnyOutlined,
  DarkModeOutlined,
  GridViewOutlined,
  SearchOutlined,
  Person2Outlined,
  MailOutlined,
  Notifications,
} from "@mui/icons-material";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Flash Social</span>
        </Link>
        <HomeOutlined />
        {darkMode ? (
          <WbSunnyOutlined onClick={toggle} />
        ) : (
          <DarkModeOutlined onClick={toggle} />
        )}
        <GridViewOutlined />
        <div className="navbar__left__search">
          <SearchOutlined />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="navbar__right">
        <Person2Outlined />
        <MailOutlined />
        <Notifications />
        <div className="avatar">
          <img src={"/upload/" + currentUser.profilePicture} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
