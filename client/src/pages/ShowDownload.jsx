import React, { useEffect, useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import { useParams } from "react-router-dom";
import './showDownload.css'
import MainLogo from '../components/MainLogo';
import { FaDownload } from 'react-icons/fa'
import { MdOutlineError } from 'react-icons/md'
import axios from 'axios';

function ShowDownload() {
    const favicon = document.getElementById('favicon');
    favicon.href = './download.ico';
    const params = useParams();
    const [downloadLink, setdownloadLink] = useState('');
    const [isLinkExpire, setIsLinkExpire] = useState(false);
    const navigate = useNavigate();
    useEffect(async () => {
        if (!params) {
            console.log("Show link has been Expire")
            setIsLinkExpire(true);
        }
        else {
            var { data } = await axios.get(`/api/files/show/${params.ufid}`);
            if (data) {
                if (data.ufid) {
                    setIsLinkExpire(false);
                    setdownloadLink(data.downloadLink)
                }
                else {
                    setIsLinkExpire(true)
                }
            } else {
                setIsLinkExpire(true);
            }
        }
    }, [])
    function handleGoHome(){
        navigate('/');
    }
    if (isLinkExpire) {
        return (

                <section className='download'>
                    <MdOutlineError className='download__icon_error' />
                    <h1>Download Link Has Been Expire!</h1>
                    <div className="send-btn-container" onClick={handleGoHome}>
                        <a href="#">Go Home!</a>
                    </div>
                </section>

        )
    }
    else {
        return (

                <section className="download">
                    {/* <img className="download__icon" src="/img/download-sd.svg" alt="inshare-download"/> */}
                    <FaDownload className='download__icon' />
                    <h2>Your file is ready to download</h2>
                    <p>Link expires in 24 hours</p>
                    <div className="download__meta">
                        <h4></h4>
                        <small></small>
                    </div>
                    <div className="send-btn-container">
                        <a href={downloadLink}>Download file</a>
                    </div>

                </section>

       )
    }
}

export default ShowDownload
