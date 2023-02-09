import React, { useRef, useState } from 'react'
import fileLogo from "../assets/file.svg"
import "./drag_container.css"
import Progress_Bar from './Progress_Bar';



function Drag_container() {
  const [dragged, setDragged] = useState("") ;
  const [readyBus, fillBus] = useState(false) ;
  const fileupload = useRef() ;
  const data = {} ;
  // URLs
  const host = "https://localhost/" ;
  const upload_url = `${host}api/files` ;

  // dragging animation
  const dragover = (e) => {
    e.preventDefault() ;
    if (dragged === "") {
      (setDragged(" dragged")) ;
    }
  }

  // dropping the files
  const dropped = (e) => {
    e.preventDefault() ;
    setDragged("") ;
    console.table(e) ;
    const data = e.dataTransfer.files ;
    if(data.length > 0) {
      fileupload.current.files = data ;
      console.table(fileupload.current.files) ;
      upload_bus() ;
    }
  }

  // http request and uploading
  const upload_bus = () => {
    fillBus(true) ;
    const file = fileupload.current.files[0] ;
    const form_data = new FormData() ;
    form_data.append("myfile",file) ;

    const xhr = new XMLHttpRequest() ;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        console.log(xhr.response)
        bus_link(JSON.parse(xhr.response)) ;
      }
    }

    // Progress Bar 
    xhr.upload.onprogress = update_progress ;

    xhr.open("POST", upload_url) ;
    xhr.send(form_data) ;
  }

  // update progress
  const update_progress = e => {
    const upload_percent = Math.round(e.loaded / e.total * 100) ;
    // const upload_percent = 20 ;
    data.progress = `${upload_percent}` ;
    console.log(upload_percent) ;
  }

  // getting the link 
  const bus_link = ({file}) => {
    fillBus(false) ;
  }

  return (
    <section className="upload-container">
      <div className={`drop-zone${dragged}`} onDragOver = {(e) => dragover(e)} onDragLeave = {() => setDragged("")} onDrop = {(e) => dropped(e)}>
        <div className="icon-container">
          <img src={fileLogo} alt="file icon" className='center' draggable = "false"/>
          <img src={fileLogo} alt="file icon" className='left' draggable = "false"/>
          <img src={fileLogo} alt="file icon" className='right' draggable = "false"/>
        </div>
        <input type="file" className='file-input' ref={fileupload} onChange = {() => upload_bus()}/>
        <div className="title">
          Drop your files here or, <span className='browse-btn' onClick={() => fileupload.current.click()}>browse</span>
        </div>
      </div>
      {
        readyBus ? <Progress_Bar data = {data}/> : null
      }
    </section>
  )
}

export default Drag_container ;
