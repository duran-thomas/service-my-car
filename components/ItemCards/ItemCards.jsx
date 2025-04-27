import './itemCards.module.css'
import { Card, Container, Col, Row, Button, Badge } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const ItemCards = ({ service, onAddToCart, cart, onRemoveFromCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const isInCart = cart.some(item => item.name === service.name);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = existingCart.some(item => item?.name === service?.name);
    setIsAdded(found);
  }, [service?.name]);

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
    setIsAdded(true);
    onAddToCart && onAddToCart(item);
  };

  return (
    <div className="item-card shadow rounded p-3 mb-4 bg-white">
      <Row>
        <Col md={4}>
          <img
            src={service.image_url || "/img/placeholder.jpg"}
            alt={service.name}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <div className="d-flex justify-content-between align-items-start">
            <h4 className="fw-bold">{service.name}</h4>
            <div className="d-flex align-items-center">
              <span className="text-secondary fw-bold">{service.duration}</span>
            </div>
          </div>

          <div className="text-muted mb-2">
            <span className="me-3">
              <strong>{service.warranty}</strong>
            </span>
            <span className="fw-semibold">{service.recommended_interval}</span>
          </div>

          <ul className="feature-list mb-2">
            {service.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="mb-1">
                <span className="text-success me-2"></span>{feature}
              </li>
            ))}
            {service.features.length > 4 && (
              <li className="text-success fw-bold">
                + {service.features.length - 4} more View All
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span className="text-decoration-line-through text-muted me-2">
                {service.price.original} {service.price.currency}
              </span>
              <span className="fs-4 fw-bold">
                {service.price.discounted} {service.price.currency}
              </span>
            </div>
            {isInCart ? (
          <Button variant="danger" onClick={() => onRemoveFromCart(service)}>
            Remove from Cart
          </Button>
        ) : (
          <Button variant="success" onClick={() => onAddToCart(service)}>
            Add to Cart
          </Button>
        )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ItemCards;
