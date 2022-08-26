import React from 'react';

import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import CurrencyFormat from 'react-currency-format';

import classes from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className={classes.productCard} to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className={classes.productCardSpan}>
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <CurrencyFormat
        value={product.price}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'฿'}
        renderText={(value) => <span>{value} </span>}
      />
    </Link>
  );
};

export default ProductCard;
