import React,{useContext} from 'react'
import './header.css';
import { AppContext } from '../App';
import userImg from '../image/user.png';
function Header({toggleActive}) {
    const {library,bookmark} = useContext(AppContext);
  return (
    <header>
        <a href="#" className="menu" onClick={toggleActive}>
            <i class="bi bi-list"></i>
        </a>


        <div className="userItems">
            <a href="#" className="icon">
                <i class="bi bi-heart-fill"></i>
                <span className="like">{library.length}</span>
            </a>
            <a href="#" className="icon">
            <i class="bi bi-bookmark-dash-fill"></i>
                <span className="bag">{bookmark.length}</span>
            </a>
            <div className="avatar">
                <a href="#">
                    <img src={userImg} alt="user image" />
                </a>
            <div className="user">
                <span>Hacktastic</span>
                <a href="#">View Profile</a>
            </div>
            </div>
        </div>
    </header>
  )
}

export default Header