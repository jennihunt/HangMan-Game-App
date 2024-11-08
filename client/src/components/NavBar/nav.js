import React from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./nav.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar(){


    return(
        <div>
 <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Hang Man</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="\">Home</Nav.Link>
            <Nav.Link href="\main">Multiple choice</Nav.Link>
            <Nav.Link href="\fillIn">Fill in the blank</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

        </div>
    )
}