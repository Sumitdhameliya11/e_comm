import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import "../css/order.css";
import addNotification from "react-push-notification";
import { useNavigate } from "react-router";

export default function Order_tracker() {
  const [cartdata, setcartdata] = useState([]);
  const [totalcost, settotalcost] = useState([]);
  const [orderDelivered, setOrderDelivered] = useState(false);
  const [orderPlaced, setorderPlaced] = useState(false);
  const [orderShipped, setorderShipped] = useState(false);
  const [orderOntheway, setorderOntheway] = useState(false);
  const navigate = useNavigate();
  const date = Date();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get_pay_order/${userId}`,
          {
            headers: {
              authorization: `bearer  ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        ); // Replace with your API endpoint to fetch the products
        if (response.ok) {
          const data = await response.json();
          setcartdata(data?.result || []); // Update tabledata with the fetched product list
          console.log(data);

          const cost =
            data?.result.reduce(
              (acc, item) => acc + item.qty * item.price,
              0
            ) || 0;
          settotalcost(cost);
          if (data?.result || [0].isdeliver === "Placed") {
            setorderPlaced(true);
          }
          if (data?.result || [0].isdeliver === "Shipped") {
            setorderShipped(true);  
          }
          if (data?.result || [0].isdeliver === "Out for  Delivery") {
            setorderOntheway(true);
          }
          if  (data?.result || [0].isdeliver === "Delivered") {
            addNotification({
              title: "Sumit.com",
              subtitle: "Order Successfully Delivered",
              message:
                "Dear Customer, Your Order has been successfully delivered.",
              theme: "black",
              native: true, // when using native, your OS will handle theming.
            });
            setOrderDelivered(true);
          } else {
            // setOrderDelivered(true);
          }
        } else {
          // Handle error
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    if (userId) {
      fetchProduct();
    }
  }, []);

  //   ============delived time ==============
  // const handleDeliveryConfirmation = async () => {
  // try {
  //   // Call API to update delivery status
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const userId = user.id;

  //   const response = await fetch(
  //     `http://localhost:5000/update_delivery_status/${userId}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `bearer  ${JSON.parse(
  //           localStorage.getItem("token")
  //         )}`,
  //       },
  //       body: JSON.stringify({ delivered: true }),
  //     }
  //   );

  //   if (!response.ok) {
  //     // Handle error if the API call fails
  //     console.error("Failed to update delivery status");
  //     return;
  //   }

  // Display notification
  // addNotification({
  //   title: "Sumit.com",
  //   subtitle: "Order Successfully Delivered",
  //   message: "Dear Customer, Your Order has been successfully delivered.",
  //   theme: "black",
  //   native: true, // when using native, your OS will handle theming.
  // });
  // // Clear the data in the table
  // setcartdata([]);
  // settotalcost(0);

  // Update the delivery status
  // setOrderDelivered(true);
  //   } catch (error) {
  //     console.error("Error updating delivery status:", error);
  //   }
  // };

  // useEffect(() => {
  //   const deliveryTimeout = setTimeout(() => {
  //     handleDeliveryConfirmation();
  //   }, 10000);

  //   return () => clearTimeout(deliveryTimeout); // Cleanup the timeout on component unmount
  // }, []);

  const back = (event) => {
    event.preventDefault(); // Prevent the default behavior of the button click
    navigate("/addcart");
  };

  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="20" xl="60">
              <MDBCard className="border-top border-bottom border-3 border-color-custom">
                <MDBCardBody className="p-5">
                  <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>
                    Purchase Reciept
                  </p>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>{date}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>012j1gvs356c</p>
                    </MDBCol>
                  </MDBRow>

                  <div
                    className="mx-n5 px-5 py-4"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    {cartdata.map((item, i) => {
                      return (
                        <MDBRow>
                          <MDBCol md="10" lg="9">
                            <p>{item.product_name}</p>
                          </MDBCol>
                          <MDBCol md="4" lg="3">
                            <p>{item.price}</p>
                          </MDBCol>
                        </MDBRow>
                      );
                    })}
                  </div>
                  <MDBRow className="my-4">
                    <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
                      <p
                        className="lead fw-bold mb-0"
                        style={{ color: "#f37a27" }}
                      >
                        Total
                      </p>
                      <p
                        className="lead fw-bold mb-0"
                        style={{ color: "#f37a27" }}
                      >
                        {totalcost}
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <p
                    className="lead fw-bold mb-4 pb-2"
                    style={{ color: "#f37a27" }}
                  >
                    Tracking Order
                  </p>

                  <MDBRow>
                    <MDBCol lg="12">
                      <div className="horizontal-timeline">
                        {cartdata.map((item, i) => {
                          return (
                            <ul className="list-inline items d-flex justify-content-between">
                              <li
                                className="list-inline-item items-list"
                                style={{ marginRight: "-8px" }}
                              >
                                {orderPlaced && (
                                  <style>{`.orderd {
                                                  background-color:#f37a27 /* Green color or any color you prefer
                                `}</style>
                                )}
                                <p
                                  className="orderd py-1 px-2 rounded text-white "
                                  style={{ marginRight: "-8px" }}
                                >
                                  {item.isdeliver}
                                </p>
                              </li>
                              <li
                                className="list-inline-item items-list"
                                style={{ marginRight: "-8px" }}
                              >
                                {orderShipped && (
                                  <style>{`.shipped {
                                                  background-color:#f37a27 /* Green color or any color you prefer
                                `}</style>
                                )}
                                <p
                                  className="shipped py-1 px-2 rounded text-white"
                                  style={{ marginRight: "-8px" }}
                                >
                                  {item.isdeliver}
                                </p>
                              </li>
                              <li
                                className="list-inline-item items-list"
                                style={{ marginRight: "-8px" }}
                              >
                                {orderOntheway && (
                                  <style>{`.on-the-way {
                                                  background-color:#f37a27 /* Green color or any color you prefer
                                `}</style>
                                )}
                                <p
                                  className="on-the-way py-1 px-2 rounded text-white"
                                  style={{ marginRight: "-8px" }}
                                >
                                  {item.isdeliver}
                                </p>
                              </li>
                              <li
                                className="list-inline-item items-list text-end"
                                style={{ marginRight: "-8px" }}
                              >
                                {orderDelivered && (
                                  <style>{`.deliver {
                                                  background-color:#f37a27 /* Green color or any color you prefer
                                `}</style>
                                )}
                                <p
                                  className="deliver py-1 px-2 rounded text-white"
                                  style={{ marginRight: "-8px" }}
                                >
                                  {item.isdeliver}
                                </p>
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <p className="mt-4 pt-2 mb-0">
                    Want any help?{" "}
                    <a href="#!" style={{ color: "#f37a27" }}>
                      Please contact us
                    </a>
                  </p>
                  <MDBBtn
                    size="lg"
                    style={{ backgroundColor: "#35558a" }}
                    className="mb-1"
                    onClick={(event) => {
                      back(event);
                    }}
                  >
                    Back
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
