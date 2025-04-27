import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, Container, Nav, NavLink, NavDropdown } from "react-bootstrap";
import "./navigation.module.css";
import Logo from './../../public/images/Superior-Logo.png'


const Navigation = () => {
  return (
    <Navbar expand="lg" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.4)', // White with 70% opacity
      position: 'absolute',
      width: '100%',
      zIndex: 1000,
    }} 
    // className="bg-transparent position-absolute w-100"
    >
      <Container>
        <NavbarBrand href="/">
        <img
            src='images/Superior-Logo.png'
            width="100"
            height="35"
            className="d-inline-block align-top"
            alt="Superior Servicing logo"
          />
          <span className="font-weight-bold">Superior Servicing</span>
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/shop">Services</NavLink>
            <NavLink href="#link">About</NavLink>
            <NavLink href="#link">Contact</NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
};

export default Navigation;