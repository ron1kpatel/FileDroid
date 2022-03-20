import React, { useRef, useState } from "react";
import "./ShowLink.css";
import { AiOutlineCopy } from "react-icons/ai";
import { FaSms } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Modals
import ShareViaModal from "./Modal/ShareViaModal";
function ShowLink({ data }) {
  // States
  const fileLinkInp = useRef();
  const [openShareViaModal, setopenShareViaModal] = useState(false);
  const [modalOption, setModalOption] = useState({});
  function handleCopyBtnClick(e) {
    if(navigator.clipboard){
      navigator.clipboard.writeText(data.file).then(()=>{
        toast.success("Copied", {
          position: toast.POSITION.BOTTOM_CENTER,
          closeButton: false,
          autoClose: 0.2,
        });
      }).catch((err)=> {
        toast.error("You have to manually Copy Link", {
          position: toast.POSITION.BOTTOM_CENTER,
          closeButton: false,
          autoClose: 0.2,
        })
      });
    }
    
  }

  function handleGmailClick() {
    setModalOption({
      shaerMethod: "gmail",
      title: "Share via Gmail",
      inputType: "email",
      placeholder: "Reciever Gmail Address",
    });
    setopenShareViaModal(true);
  }

  function handleSmsClick() {
    console.log("SMS Click");
    setModalOption({
      shaerMethod: "sms",
      title: "Share Via SMS",
      inputType: "text",
      placeholder: "Reciever SMS Number",
    });
    setopenShareViaModal(true);
  }

  return (
    <>
      <div className="link-container">
        <p className="expire">Link expires in 24 hours.</p>

        <div className="input-container">
          <input
            type="text"
            id="fileLink"
            ref={fileLinkInp}
            readOnly
            value={data.file}
          />
          <AiOutlineCopy className="icon" onClick={handleCopyBtnClick} />
        </div>
      </div>
      <div className="social-share-container">
        <p>Or Send Anonymously via:</p>
        <div className="icon-container-share">
          <div className="inner-container-share">
            <SiGmail
              className="gmail-icon share-icon"
              onClick={handleGmailClick}
            />
          </div>
          <div className="inner-container-share">
            <FaSms className="sms-icon share-icon" onClick={handleSmsClick} />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
      {/* Modals */}
      {openShareViaModal && (
        <ShareViaModal
          closeModal={setopenShareViaModal}
          options={modalOption}
          ufid={data.ufid}
        />
      )}
    </>
  );
}

export default ShowLink;
