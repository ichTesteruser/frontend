import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

//? Bootstrap component

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//! Custom component

import { Store } from '../../Store';
import Rating from '../utils/Rating';

function Products(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className='product'>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} id="card-img-top" alt={product.name}  />
      </Link>
      <Card.Body>
        <Link id="link-decoration" to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button  disabled id='out-of-stock'>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}><FontAwesomeIcon icon={faCartShopping} className="white-icon" ></FontAwesomeIcon>{' '}Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Products;
