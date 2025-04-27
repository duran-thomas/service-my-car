import { Card, Row, Col, Button } from "react-bootstrap";

const PackageSummary = ({ pkg, onCheckout, onRemoveFromCart }) => {
  return (
    <div className="package-summary">
      <h3>Summary</h3>
      {pkg.map((service, index) => (
        <Row key={index} className="mb-2">
          <Card>
            <div className="service p-2">
              <Row>
                <h5>{service.name}</h5>
              </Row>
              <Row>
                <Col lg={6}>
                  <p className="">{service.duration}</p>
                </Col>
                <Col lg={6}>
                  <span style={{ color: '#e53935', fontWeight: 'bold' }}>
                    $ {service.price?.discounted} {service.price?.currency}
                  </span>
                </Col>
              </Row>
              {/* <Button 
                variant="danger" 
                onClick={() => onRemoveFromCart(service)}>
                Remove
              </Button> */}
            </div>
          </Card>
        </Row>
      ))}
      <br></br>
      {pkg.length != 0 ? (
        <div>
        <div className="d-flex justify-content-between">
          <h5>Total:</h5>
          <span style={{ color: '#e53935', fontWeight: 'bold' }}>
            $ {pkg.reduce((acc, service) => acc + service.price.discounted, 0)} {pkg[0]?.price?.currency}
          </span>
          
        </div>
        <Button className="mx-auto" variant="danger" onClick={onCheckout}>
            Continue to Checkout  
          </Button>
        </div>
      ) : 
      <p>No Packages selected</p>}
      

      <style jsx>{`
        .package-summary {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        h3 {
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        ul {
          margin: 0;
          padding-left: 20px;
        }

        li {
          margin-bottom: 4px;
        }

        .checkout-button {
          margin-top: 20px;
          padding: 10px 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
        }

        .checkout-button:hover {
          background-color: #005dc1;
        }
      `}</style>
    </div>
  );
};

export default PackageSummary;
