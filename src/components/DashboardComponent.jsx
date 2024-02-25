import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import EditProductComponent from "./EditProductComponent";
import DeleteProductComponent from "./DeleteProductComponent";

// https://react-bootstrap.netlify.app/docs/components/buttons
// https://react-bootstrap.netlify.app/docs/components/table

function DashboardComponent() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const handleCloseAddProduct = () => setShowAddProductModal(false);
  const handleShowAddProduct = () => setShowAddProductModal(true);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [qtyInStock, setQtyInStock] = useState("");

  // const [products, setProducts] = useState(

  // );

  const products =
    localStorage.getItem("products") === null
      ? []
      : JSON.parse(localStorage.getItem("products"));

  const addProductSubmitHandler = (e) => {
    e.preventDefault(); // This code prevent the website from reloading when someone clicks on the register button

    const id = uuidv4();

    const loggedInSellerObject = JSON.parse(
      localStorage.getItem("loginSeller")
    );

    const newProduct = {
      id: id,
      seller: loggedInSellerObject.email,
      name: name,
      image: image,
      actualPrice: actualPrice,
      sellingPrice: sellingPrice,
      qtyInStock: qtyInStock,
    };

    if (localStorage.getItem("products") === null) {
      localStorage.setItem("products", JSON.stringify([]));
    }

    // This gets and stores products in the local storage in a array, since local storage returns a string by default.
    const productsInLocalStorageArray = JSON.parse(
      localStorage.getItem("products")
    );

    productsInLocalStorageArray.push(newProduct);

    localStorage.setItem(
      "products",
      JSON.stringify(productsInLocalStorageArray)
    );

    // Close the modal
    setShow(false);

    // Notify the seller that thet've successfully registered
    toast.success("Product added successfully");
  };

  // let products = JSON.parse(localStorage.getItem("products"));

  // const productsInLocalStorageArray = JSON.parse(
  //   localStorage.getItem("products")
  // );

  // useEffect(() => {
  //   if (localStorage.getItem("products") === null) {
  //     setProducts([]);
  //   }

  //   setProducts(JSON.parse(localStorage.getItem("products")));
  // }, []);

  {
    /* <img
    src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    height={100}
    width={100}
    alt="bh"
  /> */
  }
  return (
    <Container>
      <ToastContainer />

      {/* Add product Modal */}
      {/* This is the button to click and open the modal */}
      <Button variant="primary" onClick={handleShowAddProduct}>
        Add Product
      </Button>

      {/* This is the add product modal */}
      <Modal show={showAddProductModal} onHide={handleCloseAddProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addProductSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product image"
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Actual price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter actual price"
                onChange={(e) => setActualPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Selling price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter selling price"
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity In Stock"
                onChange={(e) => setQtyInStock(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* End of Add product Modal */}

      {/* Edit product modal */}

      {/* All Products */}

      <div className="mt-5">
        <h4 className="mb-3">Products</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Actual Price</th>
              <th>Selling Price</th>
              <th>Qty In Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <img src={product.image} alt="" width={70} height={70} />
                </td>
                <td>GHS {product.actualPrice}</td>
                <td>GHS {product.sellingPrice}</td>
                <td>{product.qtyInStock}</td>
                <td>
                  <EditProductComponent product={product} />
                  <DeleteProductComponent productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default DashboardComponent;
