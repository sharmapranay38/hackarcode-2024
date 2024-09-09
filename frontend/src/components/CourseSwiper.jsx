import React,{useState} from 'react'
import {Swiper,SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import './courseSwiper.css';

import { EffectCoverflow, Navigation,Autoplay } from 'swiper/modules';   
import CourseSlide from './CourseSlide';

function CourseSwiper({courses}) {
    const [active,setActive] = useState(false);
    const handleToggleVideo=()=>{
        setActive(!active);
    }
    
  return (
    <Swiper
    effect={'coverflow'}
    grabCursor={true}
    navigation={true}
    loop={true}
    centeredSlides={true}
    slidesPerView={"auto"}
    coverflowEffect={{
        rotate:35,
        stretch: 200,
        depth:250,
        modifier: 1,
        slideShadows: true,
    }}
    // autoplay={{
    //     delay:2500,
    //     disableOnInteraction: false,
    // }}
    modules={[EffectCoverflow,Navigation,Autoplay]}
    className='courseswiper'
    
    >
        {
            courses.map(course=>(
                <SwiperSlide key={course.id}>
                <CourseSlide 
                course={course}
                active={active} 
                toggleVideo={handleToggleVideo}
                
                />
                </SwiperSlide>
            ))
        }
    </Swiper>
  );
}

export default CourseSwiper