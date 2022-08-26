import React from 'react';

import profilePng from '../../images/Profile.png';
import { Rating } from '@material-ui/lab';

import classes from './ReviewsCard.module.css';

const ReviewsCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className={classes.reviewCard}>
      <img src={profilePng} alt='User' />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className={classes.reviewCardComment}>{review.comment}</span>
    </div>
  );
};

export default ReviewsCard;
