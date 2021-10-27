import { getAuth, signOut } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InfoIcon from '@material-ui/icons/Info';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import BusinessIcon from '@material-ui/icons/Business';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import image from '../img/avatar.png';
import images from '../img/play.png';
import './Dashboard.css';

const Dashboard = ({ history }) => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        history.push('/');
      })
      .catch((e) => alert(e.message));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/');
    }
  }, []);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <html>
      <body id='dashboard-body'>
        <div id='left' class='column'>
          <div className='"top-left'>
            <img id='play' src={images} alt='avatar' />
          </div>
          <div class='left-bottom'>
            <a class='links selected' href='#'>
              <HomeIcon color='success' fontSize='large' />
            </a>
            <a class='links' href='#'>
              <CalendarTodayIcon color='success' fontSize='large' />
            </a>
            <a class='links' href='#'>
              <NotesIcon color='success' fontSize='large' />
            </a>
            <a class='links' href='#'>
              <WbSunnyIcon color='success' fontSize='large' />
            </a>
            <a class='links' href='#'>
              <FastfoodIcon color='success' fontSize='large' />
            </a>
            <a class='links' href='#'>
              <RestaurantIcon color='success' fontSize='large' />
            </a>
            <a class='links' href='#'>
              <BusinessIcon color='success' fontSize='large' />
            </a>
            <a class='links' href='#'>
              <InfoIcon color='success' fontSize='large' />
            </a>
          </div>
        </div>
        <div id='right' class='column'>
          <div class='top-right'>
            <p id='user'>{currentUser && currentUser.displayName}</p>
            <span></span>
            <div>
              <button id='logout' onClick={logout}>
                Logout
              </button>
            </div>
          </div>
          <div class='right-bottom'>
            <div class='container-items'>
              <div>
                <MoreVertIcon id='dot' fontSize='small' />
                <StarBorderIcon id='star' fontSize='small' />
                <img id='avatar' src={image} alt='avatar' />
                <MailOutlineIcon id='mail' fontSize='small' />
              </div>
            </div>
            <div class='container-items'>
              <div>
                <MoreVertIcon id='dot' fontSize='small' />
                <StarBorderIcon id='star' fontSize='small' />
                <img id='avatar' src={image} alt='avatar' />
                <MailOutlineIcon id='mail' fontSize='small' />
              </div>
            </div>
            <div class='container-items'>
              <div>
                <MoreVertIcon id='dot' fontSize='small' />
                <StarBorderIcon id='star' fontSize='small' />
                <img id='avatar' src={image} alt='avatar' />
                <MailOutlineIcon id='mail' fontSize='small' />
              </div>
            </div>
            <div class='container-items'>
              <div>
                <MoreVertIcon id='dot' fontSize='small' />
                <StarBorderIcon id='star' fontSize='small' />
                <img id='avatar' src={image} alt='avatar' />
                <MailOutlineIcon id='mail' fontSize='small' />
              </div>
            </div>
            <div class='container-items'>
              <div>
                <MoreVertIcon id='dot' fontSize='small' />
                <StarBorderIcon id='star' fontSize='small' />
                <img id='avatar' src={image} alt='avatar' />
                <MailOutlineIcon id='mail' fontSize='small' />
              </div>
            </div>
            <div class='container-items'>
              <div>
                <MoreVertIcon id='dot' fontSize='small' />
                <StarBorderIcon id='star' fontSize='small' />
                <img id='avatar' src={image} alt='avatar' />
                <MailOutlineIcon id='mail' fontSize='small' />
              </div>
            </div>
            <div class='container-items'>
              <div>
                <MoreVertIcon id='dot' fontSize='small' />
                <StarBorderIcon id='star' fontSize='small' />
                <img id='avatar' src={image} alt='avatar' />
                <MailOutlineIcon id='mail' fontSize='small' />
              </div>
            </div>
            <div class='container-items'>
              <div>
                <MoreVertIcon id='dot' fontSize='small' />
                <StarBorderIcon id='star' fontSize='small' />
                <img id='avatar' src={image} alt='avatar' />
                <MailOutlineIcon id='mail' fontSize='small' />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
export default Dashboard;