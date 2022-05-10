import { Container } from "react-bootstrap";

import OrderEntry from './pages/entry/OrderEntry';
import {OrderDetailsProvider} from './context/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary pate and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/*  confirmation page does not need provider */}
    </Container>
  );
}

export default App;
