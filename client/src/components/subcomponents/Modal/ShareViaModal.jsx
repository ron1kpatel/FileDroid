import React, {useState} from 'react'
import './Modal.css'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import axios from 'axios';
import ShowResult from './ShowResult';
function ShareViaModal({ closeModal, options, ufid}) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showSendResult, setshowSendResult] = useState(false);
    const [sendResult, setSendResult] = useState({});
    async function sendDownloadLink(e){
        e.preventDefault();
        let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        
        let isEmailValidate = emailRegex.test(email);
        //IF email is wrong
        if(!isEmailValidate){
            setSendResult({
                error: true,
                message: "Invalid Email Address!"
            })            
            setshowSendResult(true);
            return;
        }
        const sendMailAPIOption = {
            ufid,
            emailTo:email,
            message
        }
        const {data} = await axios.post('/api/files/send/email', sendMailAPIOption);
        setshowSendResult(true);
        if(!data){
            setSendResult({
                error: true,
                message: "Something went wrong!"
            })
        }else{
            if(data.success){
                setSendResult({
                    error: false,
                    message: "Email Sent!"
                })
            }else{
                setSendResult({
                    error:true,
                    message: data.message
                })
            }
        }

    }
    return (
        <>
            <div className="modal-background">
                <div className="modal-container">
                    <IoMdCloseCircleOutline className='close-btn' onClick={()=> {closeModal(false)}} />
                    <h1 className="title">{options.title}</h1>

                    <form className="form-container">
                        <div className="input-container">
                            <input type={options.inputType} className='input'  placeholder={`${options.placeholder}...`} required onChange={(e)=>{setEmail(e.target.value)}}/>
                            <textarea name="email-message" className='input text-box' id="email-message" cols="32" rows="6" placeholder='Message...' onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                        </div>
                        <div className="btn-container">
                            <button className='btn btn-primary' onClick={sendDownloadLink}>Send</button>
                        </div>
                    </form>
                   
                    {showSendResult ? <ShowResult result={sendResult}/>: null }
                </div>
            </div>
        </>
    )
}

export default ShareViaModal;