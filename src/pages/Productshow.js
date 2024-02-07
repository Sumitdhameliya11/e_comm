import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import "../css/card.css";
import { Row, Col } from "reactstrap";

const ProductShow = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(" ");
  const navigate = useNavigate();
   // Assuming userId is retrieved after user authentication
  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_product",{
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

  const add_to_favourite = async(productId)=>{
    try {
      const response = await fetch(`http://localhost:5000/add_to_favourite/${productId}`, {
        method: "POST", // Additional headers or body data can be sent here if required
        headers:{
          authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
        }
      });

      if (response.ok) {
        console.log("Product added to favourite");
        navigate("/saveproduct");
        // Perform actions based on the successful addition to cart
      } else {
        console.error("Failed to add product to favourite");
        // Handle error scenario
      }
    } catch (error) {
      console.error("Add to favourite error:", error);
    }

  };

  return (
    <div className="container">
      <div className="search"style={{
        marginTop:"100px",
        padding: "1em 0.7em",
        width: "100%",
      }}>
        <input type="search"
          name="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter the product name"/>
      </div>
      <div className=""></div>
      <Row xs={1} md={2} lg={4}>
        {data.length && data.filter((product) => { 
          if(query === ""){
            return product;
          }else if(product.product_name.toLowerCase().includes(query.toLowerCase())){
            return product;
          }
          return false;
        }).map((product, index) => (
          <Col key={index}>
            <Card className="card" style={{ width: "18rem", marginBottom: "20px" }}>
              <Card.Body>
                <Card.Img variant="top" src={`http://localhost:5000/uploads/${product.product_image}`} alt={product.name} />
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" onClick={() => {Addcart(product.id)}}>
                  Add To Cart
                </Button>
                <Button variant="primary" onClick={() => {add_to_favourite(product.id)}} >
                  Save Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductShow;
