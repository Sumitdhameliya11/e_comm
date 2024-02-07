import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/re.css";
import { useNavigate } from "react-router";


const Otp = () => {
  const [otpinput,setotpinput]=useState('');
  const navigate = useNavigate();
const handleSubmit = async(e) => {
  // const data = new FormData(e.target);
  e.preventDefault();
  console.log(otpinput);

  try {
    //caling api
    const response = await fetch(`http://localhost:5000/verify_otp/${otpinput}`, {
      headers: {
        authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    if (response.ok) {
      // Handle successful response
      const data = await response.json();
      console.log(data);
      navigate("/profile");
    } else {
      // Handle error
    }
  } catch (error) {
    // Handle network or parsing errors
    console.error("Fetch error:", error);
  }
};
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="otp">
          <input
            type="number"
            name="otp"
            className="textinput"
            placeholder="Enter your otp"
            value={otpinput}
            onChange={(e) => setotpinput(e.target.value)}
          />
        </div>
        <Button className="primary" type="submit" >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Otp;
