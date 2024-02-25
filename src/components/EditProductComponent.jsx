import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { MdEdit } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";

function EditProductComponent({ product }) {
  const [showEditProductModal, setShowEditProductModal] = useState(false);

  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image);
  const [actualPrice, setActualPrice] = useState(product.actualPrice);
  const [sellingPrice, setSellingPrice] = useState(product.sellingPrice);
  const [qtyInStock, setQtyInStock] = useState(product.qtyInStock);

  const handleCloseEditProduct = () => setShowEditProductModal(false);
  const handleShowEditProduct = () => setShowEditProductModal(true);

  const editProductSubmitHandler = (e) => {
    e.preventDefault(); // This code prevent the website from reloading when someone clicks on the register button

    const productsInLocalStorageArray = JSON.parse(
      localStorage.getItem("products")
    );

    const editedProduct = {
      id: product.id,
      seller: product.seller,
      name: name,
      image: image,
      actualPrice: actualPrice,
      sellingPrice: sellingPrice,
      qtyInStock: qtyInStock,
    };

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

    const filteredProductsInLocalStorageArray =
      productsInLocalStorageArray.filter(
        (localStorageProduct) => localStorageProduct.id !== product.id
      );

    filteredProductsInLocalStorageArray.push(editedProduct);

    localStorage.setItem(
      "products",
      JSON.stringify(filteredProductsInLocalStorageArray)
    );

    // Close the modal
    setShowEditProductModal(false);

    // Notify the seller that thet've successfully registered
    toast.success("Product updated successfully");
  };

  return (
    <>
      <MdEdit className="text-primary" onClick={handleShowEditProduct} />
      <Modal show={showEditProductModal} onHide={handleCloseEditProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={editProductSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                placeholder="Enter product image"
                onChange={(e) => setImage(e.target.value)}
              />
              <img src={image} alt="" width={70} height={70} className="mt-2" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Actual price</Form.Label>
              <Form.Control
                type="number"
                value={actualPrice}
                placeholder="Enter actual price"
                onChange={(e) => setActualPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Selling price</Form.Label>
              <Form.Control
                type="number"
                value={sellingPrice}
                placeholder="Enter selling price"
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity In Stock</Form.Label>
              <Form.Control
                type="number"
                value={qtyInStock}
                placeholder="Enter Quantity In Stock"
                onChange={(e) => setQtyInStock(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditProductComponent;
