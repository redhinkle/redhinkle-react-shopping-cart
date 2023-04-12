import {Card, Button, Form, Row, Col} from 'react-bootstrap'
import { CartContext } from '../CartContext'
import { useContext } from 'react'

export const ProductCard = (props) => { //props.product
    const product = props.product
    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(product.id)
    console.log(cart.items)
  return (
      <Card>
          <Card.Body>
              <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {productQuantity > 0 ? 
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
              <Col sm="6">
                <Button sm="6" onClick={() => cart.addOnetoCart(product.id)} className='mx-2'>+</Button>
                <Button sm="6" onClick={() => cart.removerOneFromCart(product.id)} className='mx-2'>-</Button>
              </Col>
              <Button variant='danger' onClick={() => cart.deleteCart(product.id)} className='my-2'>Remove from Cart</Button>
            </Form>
          </>
          :        
              <Button variant='primary' onClick={() =>cart.addOnetoCart(product.id)}>Add To Cart</Button>
      }
          </Card.Body>
    </Card>
  )
}
