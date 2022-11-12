import axios from "axios";
import React from "react";

export default function Hebcal() {
  const [post, setPost] = React.useState({});

  const [newStuff, setNewStuff] = React.useState(false);
  const [date, setDater] = React.useState({
    birthday: "1993-03-01",
  });

  React.useEffect(() => {
    axios
      .get(
        `https://www.hebcal.com/converter?cfg=json&date=${date.birthday}&g2h=1&strict=1`
      )
      .then((response) => {
        setPost(response.data);
      });
  }, []);

  function updatePost() {
    axios
      .get(
        `https://www.hebcal.com/converter?cfg=json&date=${date.birthday}&g2h=1&strict=1`
      )
      .then((response) => {
        setPost(response.data);
      });
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setDater((prevDater) => {
      return {
        ...prevDater,
        [name]: value,
      };
    });
  }

  return (
    <div className="container">
      <div className="row">
        <h2>
          {post.gm}/{post.gd}/{post.gy} = {post.hd} {post.hm}, {post.hy}{" "}
        </h2>
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <h3 className="hebrew">
          {post.hebrew} {post.events ? post.events : ""}
        </h3>
        <div className="col-8">
          <label for="birthday">Birthday:</label>

          <input
            type="date"
            id="birthday"
            defaultValue={date.birthday}
            name="birthday"
            value={date.birthday}
            onChange={handleChange}
          />

          <button className="btn btn-primary mt-2" onClick={updatePost}>
            Convert to Hebrew
          </button>
        </div>
      </div>
    </div>
  );
}
