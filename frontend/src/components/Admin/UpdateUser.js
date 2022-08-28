import React, { Fragment, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from '../../actions/userAction';
import { UPDATE_USER_RESET } from '../../constants/userConstants';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { Button } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import classes from './NewProduct.module.css';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const { user: userCurrent } = useSelector((state) => state.user);

  const userId = params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    console.log('send ', userId);
    if (user && user._id !== userId) {
      // console.log('dispatch getUserDetails ', userId);
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User Updated Successfully');
      navigate('/admin/users');
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    navigate,
    updateError,
    user,
    userId,
    userCurrent,
  ]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('role', role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title='Update User' />
      <div className={classes.dashboard}>
        <Sidebar />
        <div className={classes.newProductContainer}>
          {loading ? (
            <Loader />
          ) : (
            <form
              className={classes.createProductForm}
              encType='multipart/form-data'
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type='text'
                  placeholder='Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <MailOutlineIcon />
                <input
                  type='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value=''>Choose Role</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </div>

              <Button
                id={classes.createProductBtn}
                type='submit'
                disabled={
                  updateLoading ? true : false || role === '' ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
