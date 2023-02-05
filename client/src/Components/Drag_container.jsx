import React, { useRef, useState } from 'react'
import fileLogo from "../assets/file.svg"
import "./drag_container.css"
function Drag_container() {
  const [dragged, setDragged] = useState("") ;
  const fileupload = useRef() ;

  // dragging animation
  const dragover = (e) => {
    e.preventDefault() ;
    if (dragged === "") {
      (setDragged(" dragged")) ;
    }
  }

  // dropping the files
  const dropped = e => {
    e.preventDefault() ;
    setDragged("") ;
    console.log(e) ;
    const data = e.dataTransfer.files ;
    if(data.length) {
      fileupload.files = data ;
      console.table(data) ;
    }
  }

  return (
    <section className="upload-container">
      <div className={`drop-zone${dragged}`} onDragOver = {(e) => dragover(e)} onDragLeave = {() => setDragged("")} 
        onDrop = {(e) => dropped(e)}>
        <div className="icon-container">
          <img src={fileLogo} alt="file icon" className='center' draggable = "false"/>
          <img src={fileLogo} alt="file icon" className='left' draggable = "false"/>
          <img src={fileLogo} alt="file icon" className='right' draggable = "false"/>
        </div>
        <input type="file" className='file-input' ref={fileupload}/>
        <div className="title">
          Drop your files here or, <span className='browse-btn' onClick={() => fileupload.current.click()}>browse</span>
        </div>
      </div>
    </section>
  )
}

export default Drag_container
