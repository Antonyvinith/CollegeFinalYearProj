import { Card, Button } from "react-bootstrap";
import "../Styling/Singleorder.css";
const SingleOrder = ({ order }) => {
  return (
      <div className="orders">
        <Card>
          <div className="innerOrders">
            <Card.Body>
              {/* <div className="ordersCard"> */}
                <Card.Title>Order Reference: {order.orderReference}</Card.Title>
                <Card.Title>Order Total: ₹ {order.orderTotal} </Card.Title>
                <Card.Text>Order Type: {order.orderType} </Card.Text>
              {/* </div> */}
            </Card.Body>
          </div>
        </Card>
      </div>
  );
};
export default SingleOrder;