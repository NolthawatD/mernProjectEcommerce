import React from 'react';

import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import classes from './CartItemCard.module.css';
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className={classes.CartItemCard}>
      <img src={item.image} alt='ssa' />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <CurrencyFormat
          value={item.price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'฿'}
          renderText={(value) => <span>{value}</span>}
        />

        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
