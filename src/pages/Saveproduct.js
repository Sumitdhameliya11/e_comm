import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/card.css";
import { Row, Col } from "reactstrap";

const Saveproduct = () => {
  const [data, setData] = useState([]);
   // Assuming userId is retrieved after user authentication
  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_saveproduct",{
          headers:{
            authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        if (response.ok) {
          const productData = await response.json();
          console.log(productData);
          setData(productData);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchProduct();
  }, []);

  const Addcart = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      console.log(userId);

      const response = await fetch(`http://localhost:5000/add_to_cart/${userId}/${productId}`, {
        method: "POST", // Additional headers or body data can be sent here if required
        headers:{
          authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
        }
      });

      if (response.ok) {
        console.log("Product added to cart");
        // Perform actions based on the successful addition to cart
      } else {
        console.error("Failed to add product to cart");
        // Handle error scenario
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <div className="container">
      <Row xs={1} md={2} lg={4}>
        {data.map((product, index) => (
          <Col key={index}>
            <Card className="card" style={{ width: "18rem", marginBottom: "20px" }}>
              <Card.Body>
                <Card.Img variant="top" src={`http://localhost:5000/uploads/${product.product_image}`} alt={product.name} />
                <Card.Title>Name:{product.product_name}</Card.Title>
                <Card.Text>Product_Price:{product.price}</Card.Text>
                <Button variant="primary" onClick={() => {Addcart(product.product_id)}}>
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Saveproduct;
