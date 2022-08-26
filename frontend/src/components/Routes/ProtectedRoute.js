import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const location = useLocation();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      return (
        <Fragment>
          <Navigate to='/login' state={{ from: location }} replace />
        </Fragment>
      );
    }
    if (isAdmin === true && user.role !== 'admin') {
      return (
        <Fragment>
          <Navigate to='/login' state={{ from: location }} replace />
        </Fragment>
      );
    }
  }

  return <Fragment>{loading === false && <Outlet />}</Fragment>;

  // return (
  //   <Fragment>
  //     {!loading && isAuthenticated ? (
  //       <Outlet />
  //     ) : (
  //       <Navigate to='/login' state={{ from: location }} replace />
  //     )}
  //   </Fragment>
  // );
};

export default ProtectedRoute;
