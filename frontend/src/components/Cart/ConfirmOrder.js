import React, { Fragment } from 'react';

import CheckoutSteps from './CheckoutSteps';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import classes from './ConfirmOrder.module.css';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.07;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));

    navigate('/process/payment');
  };

  return (
    <Fragment>
      <MetaData title='Confirm Order' />
      <CheckoutSteps activeStep={1} />
      <div className={classes.confirmOrderPage}>
        <div>
          <div className={classes.confirmShippingArea}>
            <Typography>Shipping Info</Typography>
            <div className={classes.confirmShippingAreaBox}>
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className={classes.confirmCartItems}>
            <Typography>Your Cart Items: </Typography>
            <div className={classes.confirmCartItemsContainer}>
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt='Product' />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      <p>{item.quantity} x</p>
                      <CurrencyFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'฿'}
                        renderText={(value) => <p>{value} </p>}
                      />
                      <p>=</p>
                      <CurrencyFormat
                        value={item.price * item.quantity}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'฿'}
                        renderText={(value) => <b>{value} </b>}
                      />{' '}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className={classes.orderSummary}>
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <CurrencyFormat
                  value={subtotal}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'฿'}
                  renderText={(value) => <span>{value} </span>}
                />{' '}
              </div>
              <div>
                <p>Shipping Charges:</p>
                <CurrencyFormat
                  value={shippingCharges}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'฿'}
                  renderText={(value) => <span>{value} </span>}
                />
              </div>
              <div>
                <p>GST:</p>
                <CurrencyFormat
                  value={tax}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'฿'}
                  renderText={(value) => <span>{value} </span>}
                />
              </div>
            </div>

            <div className={classes.orderSummaryTotal}>
              <p>
                <b>Total:</b>
              </p>
              <CurrencyFormat
                value={totalPrice}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'฿'}
                renderText={(value) => <span>{value} </span>}
              />
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
