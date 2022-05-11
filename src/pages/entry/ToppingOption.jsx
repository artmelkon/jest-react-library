import { Col, Form } from "react-bootstrap";

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (e) => {
    const isChecked = e.target.checked;
    updateItemCount(name, isChecked ? 1 : 0);
  };
  
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
