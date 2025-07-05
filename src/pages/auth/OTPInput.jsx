import React, { useState } from "react";

const OTPInput = ({ length = 6, value, onChange }) => {
  const [otpValues, setOtpValues] = useState(Array(length).fill(""));

  const handleChange = (e, idx) => {
    const val = e.target.value;

    if (/^\d?$/.test(val)) { // allow only one digit (or empty)
      const newOtpValues = [...otpValues];
      newOtpValues[idx] = val;
      setOtpValues(newOtpValues);

      // Pass joined OTP back to parent
      onChange(newOtpValues.join(""));
      
      // Focus next input if digit entered
      if (val && idx < length - 1) {
        const nextInput = document.getElementById(`otp-input-${idx + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otpValues[idx] && idx > 0) {
      const prevInput = document.getElementById(`otp-input-${idx - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {otpValues.map((digit, idx) => (
        <input
          key={idx}
          id={`otp-input-${idx}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "24px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
