import React from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

function DeleteProductComponent({ productId }) {
  const deleteProductSubmitHandler = () => {
    const productsInLocalStorageArray = JSON.parse(
      localStorage.getItem("products")
    );

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

    const filteredProductsInLocalStorageArray =
      productsInLocalStorageArray.filter(
        (localStorageProduct) => localStorageProduct.id !== productId
      );

    localStorage.setItem(
      "products",
      JSON.stringify(filteredProductsInLocalStorageArray)
    );

    toast.success("Product deleted successfully");
  };
  return (
    <MdDelete className="text-danger" onClick={deleteProductSubmitHandler} />
  );
}

export default DeleteProductComponent;
