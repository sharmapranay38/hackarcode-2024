import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react';
function CourseSlide({course ,active,toggleVideo}) {
  return (

    <div className="courseSlider">
        <img src={course.img} alt="game image" />
        <div className={`video ${active?'active':undefined}`}>
            <iframe 
                width="560" 
                height="315" 
                src={course.trailer} 
                title={course.title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>

            </iframe>
        </div>
        <div className="content">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className="buttons">
                <a href="#" className="orderBtn">Bookmark</a>
                <a href="#" className={`playBtn ${active?'active':undefined}`} 
                onClick={toggleVideo}>
                    <span className="pause">
                    <i class="bi bi-pause"></i>
                    </span>
                    <span className="play">
                    <i class="bi bi-play"></i>
                    </span>
                </a>
            </div>
        </div>
    </div>

  )
}

export default CourseSlide