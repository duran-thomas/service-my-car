'use client';
import HeroGeneral from '@/components/Hero-General/HeroGeneral';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('formPayload');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setEmail(parsedUser.email || '');
      setTelephone(parsedUser.phone || '');
    }
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price.discounted, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      name,
      email,
      telephone,
      date,
      time,
      items: cart
    };
    console.log('Order submitted:', order);
    alert('Order submitted! Check console for details.');
    setName('');
    setEmail('');
    setTelephone('');
    setDate('');
    setTime('');
    localStorage.removeItem('cart');
    localStorage.removeItem('formPayload');
    // Clear cart state and trigger cart update event
    setCart([]);
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <div>
      <HeroGeneral title="Checkout" subtitle="Complete your order" />
      <Container className="my-5">
      <h2>Customer Info</h2>
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  type="text"
                  value={telephone}
                  onChange={e => setTelephone(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDate" className="mb-3">
                <Form.Label>Preferred Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTime" className="mb-3">
                <Form.Label>Preferred Time</Form.Label>
                <Form.Control
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit Order
              </Button>
            </Form>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header as="h5">Order Summary</Card.Header>
              <Card.Body>
                {cart.length === 0 ? (
                  <p>Your cart is empty. Please add items to your cart.</p>
                ) : (
                  <>
                    <ListGroup variant="flush">
                      {cart.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <strong>{item.name}</strong><br />
                          Price: {item.price.currency} {item.price.discounted}<br />
                          Warranty: {item.warranty}<br />
                          Recommended Interval: {item.recommended_interval}<br />
                          Duration: {item.duration}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <hr />
                    <h5>Total: {cart[0]?.price.currency} {calculateTotal().toFixed(2)}</h5>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
