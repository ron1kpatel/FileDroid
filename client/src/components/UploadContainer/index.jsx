import React, { useRef, useState } from 'react'
import './UploadContainer.css'
import dropzone_logo from './main-drop-zone-icon.svg'
import axios from 'axios';
import ShowLink from '../subcomponents/ShowLink';
import ToLargeError from './ToLargeError';
// var host = 'http://localhost:8090';
var fileUploadUrl = `/api/files/upload`;
function UploadContainer() {

  const bgProgress = useRef(null);
  const progressPercent = useRef(null);
  const progressBar = useRef(null);
  const progressContainer = useRef(null);
  const [showLink, setshowLink] = useState(false);
  const [fileData, setfileData] = useState('');
  const [enableTolargeComp, setEnableTolargeComp] = useState(false);
  function handleDragOver(e) {
    e.preventDefault();
    setEnableTolargeComp(false);
    if (!e.target.classList.contains("dragged")) {
      e.target.classList.add("dragged");
    }
  }
  function handleDragLeave(e) {
    setEnableTolargeComp(false);
    e.target.classList.remove('dragged');
  }
  function handelDrop(e) {
    e.preventDefault();
    e.target.classList.remove('dragged');
    // console.log(e);
    var files = e.dataTransfer.files;
    uploadFile(files);
  }
  function trackProgress(progress) {
    var progress = Math.round((progress.loaded / progress.total) * 100);
    // console.log(progress);
    bgProgress.current.style.width = `${progress}%`
    progressPercent.current.innerText = `${progress}`
    progressBar.current.style.transform = `scaleX(${progress / 100})`
  }
  async function uploadFile(files) {
    setEnableTolargeComp(false);
    //Check Size of file
    if (files.length || files.target.files.length) {
      if (files[0]) {
        if (files[0].size > 419430400) {
          setshowLink(false);
          progressContainer.current.style.display = 'none';
          setEnableTolargeComp(true);
          return;
        }
      }
      if (files.target) {
        progressContainer.current.style.display = 'none';
        if (files.target.files[0].size > 419430400) {
          setshowLink(false);
          setEnableTolargeComp(true);
          return;
        }
      }

    }

    progressContainer.current.style.display = 'block';
    if (files.length || files.target.files.length) {
      var fileinput = document.querySelector('#fileinput');
      if (files.length) {
        fileinput.files = files;
      }
      var uploadFile = fileinput.files[0];
      const formData = new FormData();
      formData.append('myFile', uploadFile);

      const { data } = await axios.post(fileUploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          trackProgress(progressEvent)
        }
      });
      if (!data.success) {
        console.log(data.message);
      } else {
        enableShowLinkComponent(data);
      }
    }
  }

  function enableShowLinkComponent(data) {
    progressContainer.current.style.display = 'none';
    setshowLink(true);
    setfileData(data);
  }
  return (
    <>
      <section className="upload-container">
        <div className="drop-zone" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handelDrop}>
          <div className="icon-container">
            <img src={dropzone_logo} alt="Loading..." draggable="false" className='left' />
            <img src={dropzone_logo} alt="Loading..." draggable="false" className='center' />
            <img src={dropzone_logo} alt="Loading..." draggable="false" className='right' />
          </div>
          <input type="file" id='fileinput' onChange={uploadFile} />
          <div className="title">Drop your Files here or, <span className='browseBtn' onClick={() => { document.querySelector('#fileinput').click() }}>Browse.</span></div>
        </div>

        <div className="progress-container" ref={progressContainer}>
          <div className="bg-progress" ref={bgProgress}>
            <div className="inner-container">
              <div className="title">Uploading...</div>
              <div className="percent-container"><span id='percent' ref={progressPercent}>0</span>%</div>
              <div className="progress-bar" ref={progressBar}></div>
            </div>
          </div>
        </div>
        {enableTolargeComp ? <ToLargeError /> : null}
        {showLink ? <ShowLink data={fileData} /> : null}
      </section>
    </>
  )
}

export default UploadContainer