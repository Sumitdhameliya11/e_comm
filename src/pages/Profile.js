import React from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader, Row,Col } from "reactstrap";
import { useNavigate } from "react-router";
const Profile = () => {
    
const [newpassword, setnewpassword] = useState();
const [oldpassword, setoldpassword] = useState();
const [cpassword , setcpassword]=useState();
const navigate = useNavigate(); 
const [modal, setmodal] = useState(false);


const  handlesubmit = (e)=>{
    e.preventDefault();
}

const update_password = async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    console.log(userId);

    if(cpassword !== newpassword){
        alert("Password Not Matched");
    }

    try {
        const response = await fetch(
          `http://localhost:5000/update_password/${userId}`,
          {
            // Replace with actual endpoint and ID
            method: "put",
            headers: {
                "Content-Type": "application/json",
              authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                oldpassword:oldpassword,
                newpassword:newpassword
            }),
          }
        );
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setoldpassword("");
          setnewpassword("");
          setcpassword("");
          setmodal(false);
          alert("Password Update Successfully");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
}

  return (
    <div className="container">
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader toggle={() => setmodal(!modal)}>
          Product Infromation
        </ModalHeader>
        <ModalBody>
          <form action="" onSubmit={handlesubmit}>
            <Row>
              <Col lg={12}>
                <div className="password">
                  <input
                    type="password"
                    name="email"
                    className="textinput"
                    placeholder="Enter Old Password"
                    value={oldpassword}
                    onChange={(e) => setoldpassword(e.target.value)}
                  />
                  <b>
                    <div className="password_error"></div>
                  </b>
                </div>
                <div className="password">
                  <input
                    type="password"
                    name="email"
                    className="textinput"
                    placeholder="Enter New Passwrod"
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                  />
                  <b>
                    <div className="password_error"></div>
                  </b>
                </div>
                <div className="password">
                  <input
                    type="password"
                    name="email"
                    className="textinput"
                    placeholder="Enter Confrim Password"
                    value={cpassword}
                    onChange={(e) => setcpassword(e.target.value)}
                  />
                  <b>
                    <div className="password_error"></div>
                  </b>
                </div>
                <div className="btn">
                  <button type="submit" className="btn btn-success" onClick={()=>{update_password()}}>Change Passwrod</button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <div className="btn">
        <button className="btn " onClick={() => setmodal(true)}>
          <b>Change Password</b>
        </button>
      </div>
    </div>
  );
};

export default Profile;
