import React, { Fragment, useEffect, useState } from 'react';

import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from '../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';

import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import classes from './ProductReviews.module.css';
import './ProductReviewsMui.css';

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState('');

  const deleteReviewsHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Review Deleted Successfully');
      navigate('/admin/reviews');
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    // dispatch(getAllReviews(id));
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

  const columns = [
    { field: 'id', headerName: 'Review ID', minWidth: 100, flex: 0.5 },
    {
      field: 'user',
      headerName: 'User',
      minWidth: 100,
      flex: 0.3,
    },
    { field: 'comment', headerName: 'Comment', minWidth: 350, flex: 1 },
    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, 'rating') >= 3
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewsHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className={classes.dashboard}>
        <Sidebar />
        <div className={classes.productListContainer}>
          <form
            className={classes.productReviewsForm}
            encType='multipart/form-data'
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className={classes.productReviewsFormHeading}>ALL REVIEWS</h1>

            <div>
              <StarIcon />
              <input
                type='text'
                placeholder='Product ID'
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id={classes.createProductBtn}
              type='submit'
              disabled={
                loading ? true : false || productId === '' ? true : false
              }
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className={classes.productListTable}
              autoHeight
            />
          ) : (
            <h1 className={classes.productReviewsFormHeading}>
              No Reivews Found
            </h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
