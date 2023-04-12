import {Button, Container, Navbar, Modal, ModalBody} from 'react-bootstrap'
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { CartProduct } from './CartProduct';

function NavbarComponent() {
    const cart = useContext(CartContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)
  

    return (
      <>
        <Navbar expand="sm">
          <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={handleShow}>Cart ({productsCount}) Items</Button>
          </Navbar.Collapse>
        </Navbar>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {productsCount > 0 ? (
              <>
                <p>Items in your cart:</p>
                {cart.items.map((product, index) => (
                  <CartProduct key={index}  id={product.id} quantity={product.quantity}></CartProduct>
                  ))
                }
                <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                <Button variant='success'>Purchase Items!</Button>
              </>
              )
              :
              (
              <h1>There are no products in your cart</h1>
              )
            }

          </Modal.Body>
        </Modal>
      </>
    );
}

export default NavbarComponent