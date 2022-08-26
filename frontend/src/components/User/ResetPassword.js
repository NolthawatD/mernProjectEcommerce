import React, { Fragment, useState, useEffect } from 'react';

import { useAlert } from 'react-alert';

import Loader from '../layout/Loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '../../actions/userAction';
import MetaData from '../layout/MetaData';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import classes from './ResetPassword.module.css';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  console.log(success);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('password', password);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Password Updated Successfully');
      navigate('/login');
    }
  }, [dispatch, alert, error, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Change Password' />
          <div className={classes.resetPasswordContainer}>
            <div className={classes.resetPasswordBox}>
              <h2 className={classes.resetPasswordHeading}>Update Profile</h2>
              <form
                className={classes.resetPasswordForm}
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  value='Update'
                  className={classes.resetPasswordBtn}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
