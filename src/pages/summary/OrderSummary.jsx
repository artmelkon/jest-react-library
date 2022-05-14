import React, { Fragment } from "react";

import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = orderDetails.toppings.size > 0;
  let toppingsDisplay = null;

  if(hasToppings) {
    const toppingArray = Array.from(orderDetails.toppings.keys());
    const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);
    toppingsDisplay = (
      <Fragment>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </Fragment>
    )
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
