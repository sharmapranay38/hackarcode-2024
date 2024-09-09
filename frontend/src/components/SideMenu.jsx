import React, { useState } from 'react'
import './sideMenu.css'
import navListData from '../data/navListData'
import NavListItem from './NavListItem'


function SideMenu({active,sectionActive}) {
  const [navData, setNavData] = useState(navListData)
  const handleNavOnClick = (id,target)=>{
    // console.log(id);
    const newNavData = navData.map(nav=>{
      nav.active=false;
      if(nav._id === id) nav.active=true;
      return nav
    });
    setNavData(newNavData);
    sectionActive(target);
  }
  




  return (
    <div className={`sideMenu ${active? 'active':undefined}`}>
      <a href="#" className='logo'>
        <i class="bi bi-book-half"></i>
        <span className="brand">Study</span>
      </a>
      <ul className="nav">
        {
          navData.map(item => (
            <NavListItem key={item._id} item={item} navOnClick={handleNavOnClick}/>
          ))
        }
      </ul>
      <ul className="social">
      <li>
          <a href="#">
          <i class="bi bi-discord"></i>
          </a>
        </li>
        <li>
          <a href="#">
          <i class="bi bi-github"></i>
          </a>
        </li>
        <li>
          <a href="#">
          <i class="bi bi-people-fill"></i>
          </a>
        </li>
        <li>
          <a href="#"></a>
        </li>
      </ul>

    </div>
  )
}

export default SideMenu