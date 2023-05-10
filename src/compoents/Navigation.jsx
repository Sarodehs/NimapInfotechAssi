// import React from 'react'

// const navbar = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default navbar

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link  href="/categories">CategoryMaster</Nav.Link> <br></br> <br></br> 
          <Nav.Link href="/">ProductMaster</Nav.Link>   <br></br>  <br></br>
          <Nav.Link href="/productmasters">ProductMasters</Nav.Link> <br></br> <br></br>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;

