import { Button } from "react-bootstrap";

import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();


    const isDisabled = orderDetails.totals['scoops'] === '$0.00';

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase("review")} disabled={isDisabled}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
