import { Alert } from "react-bootstrap";

const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || "An unexpected error acourred. Please try later again!";

  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
