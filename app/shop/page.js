'use client'
import HeroGeneral from "@/components/Hero-General/HeroGeneral";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import ItemCards from "@/components/ItemCards/ItemCards";
import './shop.module.css'
import InlineWizardForm from "@/components/CarSelector/InlineWizardForm";
import Toast from "@/components/Toast/Toast";

const servicesData = {
    services: [
    {
        name: "Basic Service",
        recommended: false,
        warranty: "500 Kms or 2 Weeks",
        recommended_interval: "Every 5,000 Kms or 3 Months",
        duration: "3 Hrs Taken",
        price: { original: 3500, discounted: 2499, currency: "JMD" },
        features: [
            "Oil Change",
            "Battery Water Top Up",
            "Tire Pressure Check",
            "Exterior Wash",
        ],
        image_url: "/images/hero-background.jpg",
    },
    {
        name: "Standard Service",
        recommended: true,
        warranty: "1000 Kms or 1 Month",
        recommended_interval: "Every 10,000 Kms or 6 Months",
        duration: "6 Hrs Taken",
        price: { original: 4884, discounted: 3419, currency: "JMD" },
        features: [
            "Car Scanning",
            "Battery Water Top Up",
            "Interior Vacuuming (Carpet & Seats)",
            "Car Wash",
        ],
        image_url: "/images/hero-background.jpg",
        },
        {
        name: "Premium Service",
        recommended: true,
        warranty: "2000 Kms or 2 Months",
        recommended_interval: "Every 15,000 Kms or 9 Months",
        duration: "8 Hrs Taken",
        price: { original: 7500, discounted: 5999, currency: "JMD" },
        features: [
            "Full Engine Diagnostics",
            "Synthetic Oil Change",
            "Brake Inspection & Adjustment",
            "Underbody Wash",
        ],
        image_url: "/images/hero-background.jpg",
    },
    {
        name: "Deluxe Service",
        recommended: false,
        warranty: "2500 Kms or 3 Months",
        recommended_interval: "Every 20,000 Kms or 12 Months",
        duration: "10 Hrs Taken",
        price: { original: 9800, discounted: 8499, currency: "JMD" },
        features: [
            "Complete Engine Tune-up",
            "Transmission Fluid Check",
            "Wheel Alignment & Balancing",
            "Interior Detailing",
        ],
        image_url: "/images/hero-background.jpg",
    },
    {
        name: "Ultimate Care Package",
        recommended: true,
        warranty: "5000 Kms or 6 Months",
        recommended_interval: "Every 30,000 Kms or 18 Months",
        duration: "12 Hrs Taken",
        price: { original: 15000, discounted: 12999, currency: "JMD" },
        features: [
            "Comprehensive Multi-Point Inspection",
            "Fuel System Cleaning",
            "Suspension Check & Repair",
            "Full Exterior & Interior Detailing",
        ],
        image_url: "/images/hero-background.jpg",
    },
    {
        name: "Ultimate Care",
        recommended: true,
        warranty: "5000 Kms or 6 Months",
        recommended_interval: "Every 30,000 Kms or 18 Months",
        duration: "12 Hrs Taken",
        price: { original: 15000, discounted: 12999, currency: "JMD" },
        features: [
            "Comprehensive Multi-Point Inspection",
            "Fuel System Cleaning",
            "Suspension Check & Repair",
            "Full Exterior & Interior Detailing",
        ],
        image_url: "/images/hero-background.jpg",
    },
    ],
}

const Shop = () => {

    const [services, setServices] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setServices(servicesData.services);
        
    }, []);

    useEffect(() => {
        setServices(servicesData.services);
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
      }, []);

    const addToCart = (item) => {
        if (typeof window !== 'undefined') {
            const existing = JSON.parse(localStorage.getItem('cart')) || [];
            const isAlreadyInCart = existing.some(cartItem => cartItem.name === item.name);
            if (isAlreadyInCart) {
            return;
        }
            const updatedCart = [...existing, item];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
            setShowToast(true);
            window.dispatchEvent(new Event("cart-updated"));
        }
    };

    const removeFromCart = (item) => {
        const updatedCart = cart.filter(cartItem => cartItem.name !== item.name);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        window.dispatchEvent(new Event("cart-updated"));
      };
    
    
    return (
        <div>
            <HeroGeneral title="Shop" subtitle="Select from our services below" />
            <Container>
                <Row className="my-4 ml-auto">
                    <h2 className="text-center">Our Service Packages </h2>
                </Row>
                <Row>
                    <Col lg={8}>
                        {services.map((service, index) => (
                            <Row key={index} className="mb-4">
                                <ItemCards service={service}
                                onAddToCart={addToCart}
                                cart={cart}
                                onRemoveFromCart={removeFromCart}/>
                            </Row>
                        ))}
                    </Col>
                    <Col lg={4}>
                        <InlineWizardForm />
                    </Col>
                </Row>
            </Container>
            {/* <Toast show={showToast} onClose={() => setShowToast(false)} message="Item added to cart!" /> */}
        </div>
    );
}

export default Shop;