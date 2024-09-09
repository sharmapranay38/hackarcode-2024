import React from 'react'
import './home.css';
import CourseSwiper from '../components/CourseSwiper';
import CourseCard from '../components/CourseCard';
function Home({courses,reference}) {
  return (
    <section id='home' className='home active' ref={reference}>
        <div className="container-fluid">
            <div className="row">
                <CourseSwiper courses={courses} />
            </div>
            <div className="row mb-4 mt-4">
                <div className="col-lg-6">
                    <h2 className='sectionTitle'>Recommended Courses</h2>
                </div>
                <div className="col-lg-6 d-flex justify-content-end align-items-center">
                    <a href="#" className="viewMore">
                        View More Courses <i className="bi bi-caret-right"></i>
                    </a>
                </div>
            </div>
            <div className="row">
                {
                    courses.slice(0,4).map(course=>(
                        <CourseCard key={course.id} course={course}/>
                    ))
                }
            </div>
        </div>
    </section>
  );
}

export default Home