import React,{useState,useEffect} from 'react'
import './courseRating.css'

function CourseRating({rating}) {

    const [stars,setStars] = useState([])
    const generateStars = () =>{
        let stars = []
        if(rating>5 || rating<1){
            return
        } 
        for(let i = 0;i<rating;i++){
            stars.push(i)
        }
        return stars;
    };
    useEffect(()=>{
        setStars(generateStars());
    },[])

  return (
    <div className="courseRating">
        {stars.map((star,index)=>(
            <i key={index} className="bi bi-star-fill"></i>
        ))}
    </div>
  )
}

export default CourseRating