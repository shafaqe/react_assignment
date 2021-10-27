import React, { useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Link } from 'react-router-dom';
import './Signup.css';
import image from '../img/02.jpg';

const Signup = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      history.push('/dashboard');
    }
  }, []);

  const onSignup = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: firstName + ' ' + lastName,
        }).then(() => history.push('/Dashboard'));  
      })
      .catch((e) => alert(e.message));
  };


  //fb signup
  const facebookprovider = new FacebookAuthProvider();
  const auth = getAuth();
  function handleFacebookSignIn() {
    signInWithPopup(auth, facebookprovider)
      .then((result) => {
        localStorage.setItem('token', result._tokenResponse.idToken);
        history.push('/dashboard');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <body>
      <div className='container'>
        <div class='container-item'>
          <img class='img' src={image} alt='signup-image' />
        </div>
        <div className='container-item'>
          <form onSubmit={handleSubmit}>
            {submitted ? (
              <div class='success-message'>
                Success! Thank you for registering
              </div>
            ) : null}

            <h1>Sign-up</h1>
            <p>
              Already have an account? <Link to='/'>Login</Link>
            </p>
            <button id='fb-btn' type='button' onClick={handleFacebookSignIn}>
              <FacebookIcon id='fb' color='success' fontSize='small' />
              <i></i>Join via facebook
            </button>
            <div className='name'>
              <div className='firstname'>
                <div id='name-cred'>
                  <label>First Name</label>
                </div>
                <input
                  id='name-area'
                  type='text'
                  onChange={(e) => setFirstName(e.target.value)}
                  name='firstName'
                />
              </div>
              <div className='lastname'>
                <div id='name-cred'>
                  <label>Last Name</label>
                </div>
                <input
                  id='name-area'
                  type='text'
                  onChange={(e) => setLastName(e.target.value)}
                  name='lastName'
                />
              </div>
            </div>
            <div id='user-cred'>
              <label>Email</label>
            </div>
            <input
              id='input-area'
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              type='email'
              className='cred-box'
              placeholder='Email Address'
              required
            />
            <div id='user-cred'>
              <label>Password</label>
            </div>
            <input
              id='input-area'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              type='password'
              className='cred-box'
              placeholder='Password'
              required
            />
            <button id='btn' type='button' onClick={onSignup}>
              <i></i>Join our community
            </button>
            <p>
              By joining you agree to the <a href=''>Terms </a>and
              <a href=''> Policy</a>
            </p>
          </form>
        </div>
      </div>
    </body>
  );
};

export default Signup;