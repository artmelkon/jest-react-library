import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SummaryForm = (props) => {
  const [tcChecked, setTcChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span>Terms and Conditioins</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
