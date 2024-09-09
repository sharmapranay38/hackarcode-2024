import React, {useState} from 'react'
import './categories.css';
import filterListData from '../data/filterListData';
import CourseCard from '../components/CourseCard';


function Categories({courses,reference}) {

  const [data, setData] = useState(courses);

  const [filters,setFilters] = useState(filterListData)
  const handleFilterCourses=(category)=>{
    const newFilters = filters.map(filter=>{
      filter.active =false;
      if(filter.name === category){
        filter.active = true;
      }
      return filter;

    });
    // setFilters(newFilters);
    if(category==="All"){
      setData(courses)
      return;
    }

    setData(courses.filter(course=>course.category === category));


  };

  const [text,setText] = useState('');
  const handleSearchCourses = e=>{
    // console.log(e.target.value);
    setData(
    courses.filter(course=>
      course.title.toLowerCase().includes(e.target.value.toLowerCase())
    )
  );
    setText(e.target.value);
  };
  return (
    <section id='categories' className="categories" ref={reference}>
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-lg-8 d-flex align-items-center justify-content-start">
            <ul className="filters">
              {
                filters.map(filter=>(
                  <li 
                    key={filter._id} 
                    className={`${filter.active?'active':undefined}`}
                    onClick={()=>handleFilterCourses(filter.name)}
                    >  
                      {filter.name}
                      </li>
                ))
              }

            </ul>
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-start">
              <div className="search">
              <i class="bi bi-search"></i>
                <input type="text" name='search' value={text} placeholder='Search' onChange={handleSearchCourses}/>
              </div>
            </div>
          </div>
          <div className="row">
            {
              data.map(course=>(
                <CourseCard key={course._id} course={course}/>
              ))
            }

          </div>
        </div>
    </section>
  );
}

export default Categories