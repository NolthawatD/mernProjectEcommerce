import React, { Fragment } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import CurrencyFormat from 'react-currency-format';

import { Typography } from '@material-ui/core';
import CartItemCard from './CartItemCard.js';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import classes from './Cart.module.css';

const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return alert.show(`Product have ${stock} in stock.`);
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className={classes.emptyCart}>
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to='/products'>View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className={classes.cartPage}>
            <div className={classes.cartHeader}>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className={classes.cartContainer} key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className={classes.cartInput}>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type='number' value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <CurrencyFormat
                    value={item.price * item.quantity}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'฿'}
                    renderText={(value) => (
                      <p className={classes.cartSubtotal}>{value}</p>
                    )}
                  />
                </div>
              ))}

            <div className={classes.cartGrossTotal}>
              <div></div>
              <div className={classes.cartGrossTotalBox}>
                <p>Gross Total</p>
                <CurrencyFormat
                  value={cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'฿'}
                  renderText={(value) => <p>{value}</p>}
                />
              </div>
              <div></div>
              <div className={classes.checkOutBtn}>
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
