import React, { useContext } from "react";
import "./bookmarkItem.css";
import { AppContext } from "../App";
function BookmarkItem({ course, index }) {
  const { bookmark, setBookmark } = useContext(AppContext);
  //   console.log(course);
  const handleRemoveFromBookmark = (course) => {
    setBookmark(bookmark.filter((item) => item._id !== course._id));
  };

  return (
    <tr className="bookmarkItem">
      <th scope="row">{index + 1}</th>
      <td>
        <img src={course.img} alt="course image" className="img-fluid" />
      </td>
      <td>{course.title}</td>
      <td>{course.status}</td>
      <td>
        <a href="#" onClick={() => handleRemoveFromBookmark(course)}>
          <i class="bi bi-trash3"></i>
        </a>
      </td>
    </tr>
  );
}

export default BookmarkItem;
