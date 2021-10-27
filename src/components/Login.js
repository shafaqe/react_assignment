import React, { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import './Login.css';
import image from '../img/01.jpg';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      history.push('/dashboard');
    }
  }, []);

  const onLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem('token', userCredential._tokenResponse.idToken);
        history.push('/dashboard');
      })
      .catch((e) => alert(e.message));
  };

  //fb login
  const facebookprovider = new FacebookAuthProvider();
  function handleFacebookSignIn() {
    const auth = getAuth();
    signInWithPopup(auth, facebookprovider)
      .then((result) => {
        localStorage.setItem('token', result._tokenResponse.idToken);
        history.push('/dashboard');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(error.message);
      });
  }
  return (
    <body>
      <div class='container'>
        <div class='container-item'>
          <img src={image} alt='login-image' />
        </div>
        <div class='container-item'>
          <form action=''>
            <h1>Login</h1>
            <p>
              Don't have an account? 
              <Link to='/Signup'>
                <a href=''>Signup</a>
              </Link>
            </p>
            <button id='fb-btn' type='button' onClick={handleFacebookSignIn}>
              <FacebookIcon id="fb" color='success' fontSize='small' />
              <i></i>Login via Facebook
            </button>
            <div className='credentials'>
              <div id='user-cred'>
                <label>Email</label>
              </div>
              <input
                id='input-area'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                type='email'
                className='cred-box'
                placeholder='Email Address'
                required
              />
              <div id='user-cred'>
                <label className='block'>Password</label>
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
            </div>
            <button id='btn' type='button' onClick={onLogin}>
              <i></i>Login our community
            </button>
            <p>
              By joining you agree to the <a href=''>Terms </a> and
              <a href=''> Policy</a>
            </p>
          </form>
        </div>
      </div>
    </body>
  );
};

export default Login;