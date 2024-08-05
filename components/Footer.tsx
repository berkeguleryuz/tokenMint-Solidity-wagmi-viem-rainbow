import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center items-center p-5">
      &copy; All rights reserved. {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
