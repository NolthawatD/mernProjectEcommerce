import React from 'react';

import { Button, Typography, Avatar } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MetaData from '../MetaData';

import classes from './About.module.css';

const About = () => {
  const visitInstagram = () => {
    window.location = 'https://www.instagram.com/nolthawat_d/';
  };
  return (
    <div className={classes.aboutSection}>
      <MetaData title='About' />
      <div></div>
      <div className={classes.aboutSectionGradient}></div>
      <div className={classes.aboutSectionContainer}>
        <Typography component='h1'>About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src='https://scontent.fbkk4-4.fna.fbcdn.net/v/t1.6435-9/149634393_1056529724835137_2078220591229119397_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFjE10ynSbh_1uNiIjuv5Mi3LnHEJClDczcuccQkKUNzAg_rdyo3aP8_ypCJOMuODA3_rkVTIOQc_glMjcGQiZ2&_nc_ohc=17Wax3kyj6AAX9TalbX&_nc_ht=scontent.fbkk4-4.fna&oh=00_AT-Cme2bvk-GtG4i1tKhWxQDbIUS1JZ_-_kC9DM2w4HBHA&oe=632BEF35'
              alt='Founder'
            />
            <Typography>Nolthawat Deanghan</Typography>
            <Button onClick={visitInstagram} color='primary'>
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @nolthawat. Only with the purpose
              to practice MERN Stack. And make me to be a good programmer.
            </span>
          </div>
          <div className={classes.aboutSectionContainer2}>
            <Typography component='h2'>Our Brands</Typography>
            <a href='https://web.facebook.com/doldow.megrand.3' target='blank'>
              <FacebookIcon className={classes.facebookSvgIcon} />
            </a>

            <a href='https://www.instagram.com/nolthawat_d/' target='blank'>
              <InstagramIcon className={classes.instagramSvgIcon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
