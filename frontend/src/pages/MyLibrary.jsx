import React from 'react'
import './myLibrary.css';
import CourseCard from '../components/CourseCard';

function MyLibrary({courses,reference}) {
  return (
    <section id="library" className='library' ref={reference}>
        <div className="container-fluid">
          <div className="row mb-3">
            <h1>my library</h1>
          </div>
          <div className="row">
            {
              courses.length===0?(
                <h2>Your Library is Empty</h2>
              ):(
                courses.map(course=><CourseCard key={course._id} course={course}/>)
              )
              
            }
          </div>
        </div>
    </section>
  )
}

export default MyLibrary