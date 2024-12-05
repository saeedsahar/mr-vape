import React, { useEffect, useLayoutEffect, useState } from "react";
import "./AgeVerificationPopup.css";

const AgeVerificationPopup = ({ onVerify }) => {
  const [isVerified, setIsVerified] = useState(false);

  useLayoutEffect(() => {
    console.log("useEffect");
    let ageBit = localStorage.getItem("ageVerified");

    if (ageBit) setIsVerified(ageBit);
  }, []);
  const handleVerify = (verified) => {
    if (verified) {
      setIsVerified(true);
      onVerify(true); // Trigger parent callback for age verification
      localStorage.setItem("ageVerified", true);
    } else {
      localStorage.setItem("ageVerified", false);
      // Attempt to close the window when "No" is clicked
      alert("You must close this window to exit.");
      window.close(); // Try to close the current window
    }
  };

  if (isVerified) return null; // Hide popup after verification

  return (
    <div className="popup-container">
      <div className="popup">
        <h2 className="popup-heading">Age Verification</h2>
        <p className="popup-text">Are you 18 or older?</p>
        <div className="button-container">
          <button className="verify-button" onClick={() => handleVerify(true)}>
            Yes
          </button>
          <button className="verify-button" onClick={() => handleVerify(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationPopup;
