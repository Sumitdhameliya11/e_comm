import React, { useState } from "react";
import "bootstrap";
import "../css/re.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import axios from "axios";
const Registration = () => {
  const [firstname, setfirstname] = useState();
  const [middlename, setmiddlename] = useState();
  const [lastname, setlastname] = useState();
  // const [mobile, setmobile] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  // const [h_no, seth_no] = useState();
  // const [soc, setsoc] = useState();
  // const [near, setnear] = useState();
  // const [area, setarea] = useState();
  // const [city, setcity] = useState();
  // const [state, setstate] = useState();
  // const [country, setcountry] = useState();
  // const [pincode, setpincode] = useState();
  // const [stream, setstream] = useState();
  // const [sem, setsem] = useState();
  // const [course, setcourse] = useState();
  // const [image, setimage] = useState();
  const navigate = useNavigate();
  // =============handle button event=========

  const handlesubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("firstname", firstname);
    // formData.append("middlename", middlename);
    // formData.append("lastname", lastname);
    // formData.append("mobile", mobile);
    // formData.append("email", email);
    // formData.append("password", password);
    // formData.append("h_no", h_no);
    // formData.append("soc", soc);
    // formData.append("near", near);
    // formData.append("area", area);
    // formData.append("city", city);
    // formData.append("state", state);
    // formData.append("country", country);
    // formData.append("pincode", pincode);
    // formData.append("stream", stream);
    // formData.append("sem", sem);
    // formData.append("course", course);
    // console.log(image);
    // formData.append("image", image);
    try {
      //caling api
      const response = await fetch("http://localhost:5000/insert", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          middlename: middlename,
          lastname: lastname,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        console.log(data);
        navigate("/Login");
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
      <section class="h-100 bg-dark">
        <form
          action=""
          method="POST"
          name="myform"
          enctype="multipart/form-data"
          onSubmit={handlesubmit}
        >
          <div className="title">
            <h3>User Infromation</h3>
          </div>
          <div className="form">
            <div className="id">
              <label for="id">ID:</label>
              <input type="number" name="id" id="myid" className="textinput" />
              <b>
                <div id="id_error"></div>
              </b>
            </div>
            <div className="username">
              <input
                type="text"
                name="name"
                className="textinput"
                placeholder="FirstName"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
              />
              <b>
                <div className="name_error"></div>
              </b>
              <input
                type="text"
                name="name"
                className="textinput"
                placeholder="MiddleName"
                value={middlename}
                onChange={(e) => setmiddlename(e.target.value)}
              />
              <b>
                <div className="name_error"></div>
              </b>
              <input
                type="text"
                name="name"
                className="textinput"
                placeholder="LastName"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
              <b>
                <div className="name_error"></div>
              </b>
            </div>
            {/* <div className="mobile">
              <input
                type="number"
                name="mobile"
                className="textinput"
                placeholder="Mobile no."
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
              />
              <b>
                <div className="mobile_error"></div>
              </b>
            </div> */}
            <div className="email">
              <input
                type="email"
                name="email"
                className="textinput"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <b>
                <div className="email_error"></div>
              </b>
            </div>
            <div className="password">
              <input
                type="password"
                name="email"
                className="textinput"
                placeholder="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <b>
                <div className="password_error"></div>
              </b>
            </div>
            {/* <div className="address">
              <input
                type="number"
                name="address"
                className="textinput"
                placeholder="Home.no"
                value={h_no}
                onChange={(e) => seth_no(e.target.value)}
              />
              <input
                type="text"
                name="address"
                className="textinput"
                placeholder="Soc.Name"
                value={soc}
                onChange={(e) => setsoc(e.target.value)}
              />
              <input
                type="text"
                name="address"
                className="textinput"
                placeholder="Near"
                value={near}
                onChange={(e) => setnear(e.target.value)}
              />
              <input
                type="text"
                name="address"
                className="textinput"
                placeholder="Area"
                value={area}
                onChange={(e) => setarea(e.target.value)}
              />
              <b>
                <div className="address_error"></div>
              </b>
              <select
                class="select"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              >
                <option value="City">City</option>
                <option value="Surat">Surat</option>
                <option value="vapi">vapi</option>
                <option value="Navsari">Navsari</option>
              </select>

              <select
                class="select"
                value={state}
                onChange={(e) => setstate(e.target.value)}
              >
                <option value="State">State</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
              </select>

              <select
                class="select"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
              >
                <option value="Country">Country</option>
                <option value="India">India</option>
                <option value="Canada">Canada</option>
                <option value="America">America</option>
              </select>

              <input
                type="number"
                name="address"
                className="textinput"
                placeholder="pincode"
                value={pincode}
                onChange={(e) => setpincode(e.target.value)}
              />
            </div>
            <div className="stream">
              <select
                class="select"
                value={stream}
                onChange={(e) => setstream(e.target.value)}
              >
                <option value="Stream">Stream</option>
                <option value="India">India</option>
                <option value="Canada">Canada</option>
                <option value="America">America</option>
              </select>
            </div>
            <div className="sem">
              <input
                type="number"
                name="sem"
                placeholder="sem"
                value={sem}
                onChange={(e) => setsem(e.target.value)}
              />
            </div>

            <div className="course">
              <input
                type="text"
                name="course"
                placeholder="course"
                value={course}
                onChange={(e) => setcourse(e.target.value)}
              />
            </div>

            <div className="sem">
              <input
                type="file"
                name="image"
                onChange={(e) => setimage(e.target.files[0])}
              />
            </div> */}
            <div className="btn">
              <button type="submit">Registration</button>
            </div>  
          </div>
        </form>
        <div className="login">
          <Link to="/Login">Login</Link>
        </div>
      </section>
    </div>
  );
};

export default Registration;
