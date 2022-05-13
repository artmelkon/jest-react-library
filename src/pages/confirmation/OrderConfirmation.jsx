import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import { useOrderDetails } from "../../context/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      // in a real app we would get order details from context
      // and send with POST  });
      .post(`http://localhost:3030/order`)
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => {
        // will handle error here
      });
  }, []);

  const handleClick = () => {
    // clear order data
    resetOrder();

    // send back to order page
    setOrderPhase("inProgress");
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank Your!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default OrderConfirmation;
