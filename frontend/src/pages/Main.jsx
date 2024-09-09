import React, { useState, useEffect, useRef, useContext } from "react";
import App, { AppContext } from "../App";
import "./main.css";
import SideMenu from "../components/SideMenu";
import Header from "./Header";
import Home from "./Home";
import Categories from "./Categories";
import MyLibrary from "./MyLibrary";
import Bookmark from "./Bookmark";
import axios from "axios";

function Main() {
  const { library, bookmark } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [courses, setCourses] = useState([]);
  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const bookmarkRef = useRef();

  const sections = [
    {
      name: "home",
      ref: homeRef,
      active: true,
    },
    {
      name: "categories",
      ref: categoriesRef,
      active: false,
    },
    {
      name: "library",
      ref: libraryRef,
      active: false,
    },
    {
      name: "bookmark",
      ref: bookmarkRef,
      active: false,
    },
  ];

  const handelToggleActive = () => setActive(!active);

  const handleSectionActive = (target) => {
    sections.map((section) => {
      // Ensure that the ref is not undefined
      if (section.ref.current) {
        // Remove 'active' class from all sections
        section.ref.current.classList.remove("active");

        // Add 'active' class to the target section
        if (section.ref.current.id === target) {
          section.ref.current.classList.add("active");
        }
      }
      return section; // Keep this return to avoid issues with .map
    });
  };

  // const fetchData = () => {
  //   fetch("http://localhost:3000/api/courseData.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCourses(data);
  //       // console.log(data);
  //     })
  //     .catch((e) => console.log(e.message));
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/course/allCourses",
        {
          headers: {
            Accept: "application/json", // Indicate that you expect JSON
          },
        }
      );

      // Access the data from the response
      const data = response.data;
      console.log("Received data:", data);

      // Assuming you have a state or another method to handle this data
      setCourses(data); // Update state or handle the data as needed
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <SideMenu active={active} sectionActive={handleSectionActive} />
      <div className={`banner ${active ? "active" : undefined}`}>
        <Header toggleActive={handelToggleActive} />
        <div className="containter-fluid">
          {courses && courses.length > 0 && (
            <>
              <Home courses={courses} reference={homeRef} />
              <Categories courses={courses} reference={categoriesRef} />
              <MyLibrary courses={library} reference={libraryRef} />
              <Bookmark courses={bookmark} reference={bookmarkRef} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
