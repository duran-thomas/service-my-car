'use client';
import { getCart, removeFromCart } from '@/lib/cart';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import HeroGeneral from '@/components/Hero-General/HeroGeneral';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price?.discounted || item.price), 0);
  };

  return (
    <div>
        <HeroGeneral title="Cart" subtitle="Review the items in your cart" />
        <Container className="my-5">
            <h1 className="mb-4">Your Cart</h1>

            {cart.length === 0 ? (
            <p>No items in cart.</p>
            ) : (
            <Row>
                <Col md={8}>
                <ListGroup>
                    {cart.map(item => (
                    <ListGroup.Item key={item.id} className="mb-3">
                        <Card>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                            Price: {item.price?.currency || '₹'} {item.price?.discounted || item.price}
                            </Card.Text>
                            {item.warranty && <div>Warranty: {item.warranty}</div>}
                            {item.recommended_interval && <div>Recommended Interval: {item.recommended_interval}</div>}
                            {item.duration && <div>Duration: {item.duration}</div>}
                            <Button variant="danger" onClick={() => handleRemove(item.id)} className="mt-2">
                            Remove
                            </Button>
                        </Card.Body>
                        </Card>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                </Col>

                <Col md={4}>
                <Card>
                    <Card.Header as="h5">Summary</Card.Header>
                    <Card.Body>
                    <h5>Total: {cart[0]?.price?.currency || '₹'} {calculateTotal().toFixed(2)}</h5>
                    <Link href="/checkout" passHref legacyBehavior>
                        <Button variant="primary" className="mt-3 w-100">Proceed to Checkout</Button>
                    </Link>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            )}
        </Container>
    </div>  
  );
}
