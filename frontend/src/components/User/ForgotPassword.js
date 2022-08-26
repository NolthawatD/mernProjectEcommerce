import React, { Fragment, useState, useEffect } from 'react';

import { useAlert } from 'react-alert';

import Loader from '../layout/Loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import MetaData from '../layout/MetaData';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import classes from './ForgotPassword.module.css';
import './UpdateProfileShift.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState('');

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('email', email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Forgot Password' />
          <div className={classes.forgotPasswordContainer}>
            <div className={classes.forgotPasswordBox}>
              <h2 className={classes.forgotPasswordHeading}>Forgot Password</h2>
              <form
                className={classes.forgotPasswordForm}
                onSubmit={forgotPasswordSubmit}
              >
                <div className={classes.forgotPasswordEmail}>
                  <MailOutlineIcon />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type='submit'
                  value='SEND'
                  className={classes.forgotPasswordBtn}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
