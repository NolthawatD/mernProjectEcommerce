import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import classes from './NotFound.module.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={classes.PageNotFound}>
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to='/'>Home</Link>
    </div>
  );
};

export default NotFound;
