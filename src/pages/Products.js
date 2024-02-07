import React, { useEffect, useState } from "react";
import "../css/product.css";
import { Modal, ModalBody, ModalHeader, Col } from "reactstrap";
import { Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
function Products() {
  const [modal, setmodal] = useState(false);
  const [productname, setproductname] = useState();
  const [price, setprice] = useState();
  const [qty, setqty] = useState();
  const [category, setcategory] = useState();
  const [subcategory, setsubcategory] = useState();
  const [description, setdescription] = useState();
  const [tabledata, settabledata] = useState([]);
  const [editclick, seteditclick] = useState(false);
  const [editindex, seteditindex] = useState();
  const [image, setimage] = useState();
  // ====fetch data====
  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_product",{
        headers:{
          authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
        }
      }); // Replace with your API endpoint to fetch the products
      if (response.ok) {
        const data = await response.json();
        settabledata(data); // Update tabledata with the fetched product list
        console.log(data);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:4000/data");//call api for all data fetch
  //     const data = await response.json();
  //     settabledata(data);
  //   };
  //   fetchData();
  // }, []);

  // ===========submit function============
  const handlesubmit = async (e) => {
    e.preventDefault();
  };

  let data = async () => {
    if (editclick) {
      console.log("update");
        try {
          const response = await fetch(
            "http://localhost:5000/update/" + editindex,
            {
              // Replace with actual endpoint and ID
              method: "put",
              headers: {
                authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
              },
              body: JSON.stringify({
                productname: productname,
                price: price,
                qty: qty,
                category: category,
                subcategory: subcategory,
                description: description,
              }),
            }
          );
          if (response.ok) {
            let data = await response.json();
            console.log(data);
            let temptabledata = tabledata;
            Object.assign(temptabledata[editindex], data);
            settabledata([...temptabledata]);
          }
        } catch (error) {
          console.log(error);
        }
    } else {
      console.log("insert");
      //post  data in api
      const formData = new FormData();
      formData.append("productname", productname);
      formData.append("price", price);
      formData.append("qty", qty);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("subcategory", subcategory);
      formData.append("image", image);
      try {
        const response = await fetch("http://localhost:5000/add_product", {
          method: "POST",
          headers:{
            authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
          },
          body: formData
        });

        if (response.ok) {
          // const data = await response.json();
          // Handle successful response
          const setdata = [...tabledata, data];
          settabledata(setdata);
          //clear input filed after submit after submit button
          fetchProductList();
          setproductname("");
          setprice("");
          setqty("");
          setcategory("");
          setsubcategory("");
          setdescription("");
          setmodal(false);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle network or parsing errors
      }
    }
  };

  const handleEdit = async (item) => {
    console.log(item);
    try {
      const response = await fetch(
        `http://localhost:5000/get_product/${item}`,
        {
          //specific data find api call
          // Replace with actual endpoint and ID
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        console.log(data);
        setproductname(data.product_name);
        setprice(120);
        setqty(520);
        setcategory("sumit");
        setsubcategory("dhameliya");
        setdescription("sdkjfnjhjgmb");
        setmodal(true);
        seteditclick(true);
        seteditindex(item);
        // Handle successful update
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network or parsing errors
    }
  };

  const handledelete = async (index) => {
    console.log(index);
    try {
      const response = await fetch(`http://localhost:5000/delete/${index}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
        },
        // You can include a request body if needed
      });

      if (response.ok) {
        let filterdata = [...tabledata];
        filterdata.splice(index, 1);
        settabledata(filterdata);
        // Handle success, maybe update the UI or state
        console.log("Record deleted successfully!");
      } else {
        // Handle the error case
        console.error("Failed to delete the record");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error occurred while deleting:", error);
    }
  };

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
                <div className="productname">
                  <input
                    type="text"
                    name="name"
                    className="textinput"
                    placeholder="product_name"
                    value={productname} 
                    onChange={(e) => setproductname(e.target.value)}
                  />
                  <b>
                    <div className="name_error"></div>
                  </b>
                </div>

                <div className="productprice">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                  />
                  <b>
                    <div className="price_error"></div>
                  </b>
                </div>

                <div className="productqty">
                  <input
                    type="number"
                    name="qty"
                    id="qty"
                    placeholder="Qty"
                    value={qty}
                    onChange={(e) => setqty(e.target.value)}
                  />
                  <b>
                    <div className="qty_error"></div>
                  </b>
                </div>

                <div className="category">
                  <input
                    type="text"
                    name="name"
                    className="textinput"
                    placeholder="product_cetegory"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                  />
                  <b>
                    <div className="name_error"></div>
                  </b>
                </div>

                <div className="subcategory">
                  <input
                    type="text"
                    name="name"
                    className="textinput"
                    placeholder="product_subcategory"
                    value={subcategory}
                    onChange={(e) => setsubcategory(e.target.value)}
                  />
                  <b>
                    <div className="subcategory_error"></div>
                  </b>
                </div>

                <div className="productdesc">
                  <textarea
                    name="productdesc"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  ></textarea>
                  <b>
                    <div className="qty_error"></div>
                  </b>
                </div>
                <div className="product_image">
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setimage(e.target.files[0])}
                  />
                </div>
                <div className="btn">
                  <button
                    type="submit"
                    onClick={() => {
                      data();
                    }}
                  >
                    {editclick ? "Update" : "Add"}
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <div class="mytable">
        <button className="btn" onClick={() => setmodal(true)}>
          Add Product
        </button>
        <table className="table" border="1">
          <thead>
            <tr>
              <th>id</th>
              <th>Product_name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>category</th>
              <th>subcategory</th>
              <th>product_image</th>
              <th>description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tabledata.map((item, i) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.price}</td>
                  <td>{item.qty}</td>
                  <td>{item.category}</td>
                  <td>{item.subcategory}</td>
                  <td>{item.product_image}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="del"
                      onClick={() => handledelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
