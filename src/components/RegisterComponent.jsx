import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// https://react-bootstrap.netlify.app/docs/forms/overview

function RegisterComponent() {
  const [fullName, setFullName] = useState(""); // This is the initial state. It can be any datatype, string, array, object etc
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerSellerSubmitHandler = (e) => {
    e.preventDefault(); // This code prevent the website from reloading when someone clicks on the register button

    // New seller information typed in the register form
    const newSeller = {
      fullName: fullName,
      email: email,
      password: password,
    };

    // We are checking if the sellers are in the local storage, if not set the sellers to an empty array
    if (localStorage.getItem("sellers") === null) {
      localStorage.setItem("sellers", JSON.stringify([]));
    }

    // This gets and stores sellers in the local storage in a array, since local storage returns a string by default.
    const sellersInLocalStorageArray = JSON.parse(
      localStorage.getItem("sellers")
    );

    // Checking if the seller already register. This returns a true or false
    const sellerAlreadyRegistered = sellersInLocalStorageArray.some(
      (seller) => seller.email === email
    );

    // If the seller already registered, show an eror, else save thier information to the local storage
    if (sellerAlreadyRegistered === true) {
      toast.error("You've already registered");
    } else {
      // We are adding the new seller from the form input using ".push()" to the sellers In Local Storage Array variable "sellersInLocalStorageArray"
      sellersInLocalStorageArray.push(newSeller);

      // We are saving the existing and the new seller to the local storage
      localStorage.setItem(
        "sellers",
        JSON.stringify(sellersInLocalStorageArray)
      );

      // Notify the seller that thet've successfully registered
      toast.success("You've successfully registered as a seller");

      setInterval(() => {
        // Redirect the seller to their dashboard after a sucessful register.
        // The purpose of the setInverval is to wait for 3 secs before redirecting the seller to the dashboard. This will wait for the notication to finish
        return navigate("/login");
      }, 3000);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h3>Register As A Seller</h3>
      <Form onSubmit={registerSellerSubmitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          {/* OnChange monitors the whatever the user is typing in the form. */}
          <Form.Control
            type="text"
            placeholder="Team Ruby"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterComponent;
