import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import addNotification from 'react-push-notification';
import "../css/product.css";

const Addcart = () => {
  const [cartdata, setcartdata] = useState([]);
  const [totalqty, settotalqty] = useState([]);
  const [totalcost, settotalcost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/add_to_cart/${userId}`,
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
          const qty =
            data?.result.reduce((acc, item) => acc + item.qty, 0) || 0;

          const cost =
            data?.result.reduce(
              (acc, item) => acc + item.qty * item.price,
              0
            ) || 0;

          settotalqty(qty);
          settotalcost(cost);
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

  const removeProduct = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;

    const response = await fetch(`http://localhost:5000/remove_from_cart/${userId}/${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer  ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });

    if (response.ok) {
      // Refresh the cart data after removal
      console.log("product successfull remove");
    } else {
      console.error('Failed to remove product from cart');
      // Handle error scenario
    }
  } catch (error) {
    console.error('Remove from cart error:', error);
  }
};

const buy_now = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;
        const response = await fetch(
          `http://localhost:5000/pay_order/${userId}/${totalcost}`,
          {
            method:"post",
            headers: {
              authorization: `bearer  ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        ); // Replace with your API endpoint to fetch the products
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          addNotification({
            title: 'Sumit.com',
            subtitle: 'Order Success',
            message: 'Dear Customer Your Order Sucessfull',
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
        });
        navigate("/order_tracker");
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Buy now error:', error);
      }
  }; 

  const cart = ()=>{
    navigate("/order_tracker");
  }
  return (
    <div class="mytable">
      <table className="table" border="1">
        <thead>
          <tr>
            <th>image</th>
            <th>Product_name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartdata.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${item.product_image}`}
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                  />
                </td>
                <td>{item.product_name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.qty * item.price}</td>

                <td>
                  <button className="del" onClick={()=>{removeProduct(item.product_id)}}>Remove</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="3"></td>
            <td>Total Qty: {totalqty}</td>
            <td>Total Cost: {totalcost}</td>
            <td>
              <button className="btn  btn-success" onClick={()=>{buy_now()}}>payment</button>
            </td>
          </tr>

          <tr>
            <td colSpan="3"></td>
            <td>
              <button className="btn btn-primary" onClick={()=>{cart()}}>Track Order</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Addcart;
