import React from "react";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className='app__social'>
      {/* <div>
        <BsTwitter></BsTwitter>
      </div> */}
      <div>
        <a href='https://www.facebook.com/ramaud/' target='_blank'>
          <FaFacebookF />
        </a>
      </div>
      <div>
        <a href='https://www.instagram.com/ramadhnssss/' target='_blank'>
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
