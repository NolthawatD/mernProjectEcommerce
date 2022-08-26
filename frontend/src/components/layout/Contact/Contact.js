import React from 'react';

import MetaData from '../MetaData';

import { Button } from '@material-ui/core';
import MailIcon from '@mui/icons-material/Mail';
import classes from './Contact.module.css';

const Contact = () => {
  return (
    <div className={classes.contactContainer}>
      <MetaData title='Contact' />
      <a className={classes.mailBtn} href='mailto:nolthawat.d@gmail.com'>
        <MailIcon />
        <Button>Contact: nolthawat.d@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
