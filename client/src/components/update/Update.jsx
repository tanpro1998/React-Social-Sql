import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../utils/axios";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const [texts, setTexts] = useState({
    id: user.id,
    email: user.email,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return axiosInstance.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPicture;
    profileUrl = profile ? await upload(profile) : user.profilePicture;

    mutation.mutate({
      ...texts,
      coverPicture: coverUrl,
      profilePicture: profileUrl,
    });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update your profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPicture
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              onChange={(e) => setCover(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePicture
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              onChange={(e) => setProfile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <label>Id:</label>
          <input type="number" name="email" value={texts.id} disabled />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={texts.email}
          />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={texts.name}
          />
          <label>City:</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={texts.city}
          />
          <label>Website:</label>
          <input
            type="text"
            name="website"
            onChange={handleChange}
            value={texts.website}
          />
          <button onClick={handleUpdate}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Update;
