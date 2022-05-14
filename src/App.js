import {useState} from 'react';
import { Container } from "react-bootstrap";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfrimation from './pages/confirmation/OrderConfirmation';

import { OrderDetailsProvider } from "./context/OrderDetails";
/* The following line can be included in your src/index.js or App.js file*/
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry; // default to order page
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfrimation;
      break;
    default:
  }
  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
