import React,{useContext} from 'react'
import './courseCard.css'
import CourseRating from './CourseRating';
import { AppContext } from '../App';

function CourseCard({course}) {
  const {library,setLibrary,bookmark,setBookmark} = useContext(AppContext);
const handleAddToLibrary = course=>{
  setLibrary([...library,course]);
};
const handleRemoveFromLibrary = course=>{
  setLibrary(library.filter(item=>item._id!==course._id));
};

const handleAddToBookmark = course =>{
  if(bookmark.includes(course)) return;
  setBookmark([...bookmark,course]);
};



  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="courseCard">
      <img src={course.img} alt={course.title} className='img-fluid'/>
      <a href="#" className={`like ${library.includes(course) ? 'active':undefined}`} 
      onClick={
        library.includes(course) ?()=>handleRemoveFromLibrary(course): ()=>handleAddToLibrary(course)

      }>
      <i class="bi bi-heart-fill"></i>
      </a>
      <div className="courseFeature">
        <span className="courseType">{course.level}</span>
        <CourseRating rating={course.rating}/>
      </div>
      <div className="courseTitle mt-4 mb-3">
        {course.title}
      </div>
      <div className="courseFinished">
        <span>
      <i class="bi bi-eye"></i>{course.price}
      </span>
      </div>
      <a href="#" className="addBookmark" onClick={()=>handleAddToBookmark(course)}>
      <i className="bi bi-bookmark-fill"></i>
      </a>
      </div>
    </div>
  );
}

export default CourseCard