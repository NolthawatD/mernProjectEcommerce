import React, { Fragment, useEffect, useState } from 'react';

import CurrencyFormat from 'react-currency-format';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  clearErrors,
  getProductDetails,
  newReview,
} from '../../actions/productAction';
import { addItemsToCart } from '../../actions/cartAction';
import { useAlert } from 'react-alert';

import Carousel from 'react-material-ui-carousel';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import ReviewCard from './ReviewsCard';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import classes from './ProductDetails.module.css';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return alert.show(`Product have ${product.stock} in stock.`);
    }
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return;
    }
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const addToCartHandler = () => {
    if (isAuthenticated === false) {
      return alert.info('Sorry, please login for get your cart');
    }
    dispatch(addItemsToCart(params.id, quantity));
    alert.success('Item Added to Cart');
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Review Submitted Successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, alert, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} details`} />
          <div className={classes.ProductDetails}>
            <div>
              <Carousel className={classes.Carousel}>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className={classes.CarouselImage}
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className={classes['detailsBlock-1']}>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className={classes['detailsBlock-2']}>
                <Rating {...options} />
                <span className={classes['detailsBlock-2-span']}>
                  ({product.numOfReviews} Reviews)
                </span>
              </div>

              <div className={classes['detailsBlock-3']}>
                <CurrencyFormat
                  value={product.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'฿'}
                  renderText={(value) => <h1>{value}</h1>}
                />
                {/* <h1>{`฿${product.price}`}</h1> */}
                <div className={classes['detailsBlock-3-1']}>
                  <div className={classes['detailsBlock-3-1-1']}>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type='number' value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>

                <p>
                  Status :
                  <b className={product.stock < 1 ? `redColor` : `greenColor`}>
                    {product.stock < 1 ? ' OutofStock' : ' InStock'}
                  </b>
                </p>
              </div>
              <div className={classes['detailsBlock-4']}>
                Description : <p>{product.description}</p>
              </div>
              <button
                onClick={submitReviewToggle}
                className={classes.submitReview}
              >
                Submit Review
              </button>
            </div>
          </div>

          <h3 className={classes.reviewsHeading}>Reviews</h3>
          <Dialog
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className={classes.submitDialog}>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size='large'
              />

              <textarea
                className={classes.submitDialogTextArea}
                cols='30'
                rows='5'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color='secondary'>
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color='primary'>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className={classes.reviews}>
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
            </div>
          ) : (
            <p className={classes.noReviews}>No reviews yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
