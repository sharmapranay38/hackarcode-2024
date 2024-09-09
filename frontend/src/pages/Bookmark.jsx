import React from 'react'
import './bookmark.css';
import BookmarkItem from '../components/BookmarkItem';

function Bookmark({courses,reference}) {
  return (
    <section id="bookmark" className='bookmark' ref={reference}>
        <div className="container-fluid">
          <div className="row mb-3">
            <h1>My Bookmarks</h1>
          </div>  
        </div>    
        {
          courses.length===0?(
            <h2>Your bookmarks are empty</h2><i class="bi bi-emoji-frown"></i>
          ):(
            <>
              <div className="row">
                <div className="table-responsive">
                  <table className="bookmarkTable table table-borderless align-middle">
                    <thead>
                      <tr>
                      <th scope='col'>No.</th>
                      <th scope='col'>Preview</th>
                      <th scope='col'>Course</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        courses.map((course,index)=>(
                          <BookmarkItem index={index} key={course._id} course={course}/>
                        ))
                      }

                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )
        }
    </section>
  )
}

export default Bookmark
