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
import Sad from '@material-ui/icons/SentimentVeryDissatisfied';
import Happy from '@material-ui/icons/SentimentSatisfiedAlt';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmailError('');
    setEmail(e.target.value);
    if (email !== '') {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegex.test(email)) {
        setEmailError(<Happy id='mail-emoj-pve' />);
      } else {
        setEmailError(<Sad id='mail-emoj-nve' />);
      }
    } else {
      setEmailError(<Sad id='mail-emoj-nve' />);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordError('');
    setPassword(e.target.value);
    if (email !== '') {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      setEmailError(<Happy id='mail-emoj-pve' />);
    } else {
      setEmailError(<Sad id='mail-emoj-nve' />);
    }
    } else {
      setEmailError(<Sad id='mail-emoj-nve' />);
    }
    if (password !== '') {
      setPasswordError(<Happy id='pass-emoj-pve' />);
    } else {
      setPasswordError(<Sad id='pass-emoj-nve' />);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

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
      .catch((error) => {
        alert(error.message);
          if (email !== '') {
          const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (emailRegex.test(email)) {
            setEmailError(<Happy id='mail-emoj-pve' />);
          } else {
            setEmailError(<Sad id='mail-emoj-nve' />);
          }
          } else {
            setEmailError(<Sad id='mail-emoj-nve'/>);
          }
          if (password !== '') {
          setPasswordError(<Happy id='pass-emoj-pve' />);
          } else {
            setPasswordError(<Sad id='pass-emoj-nve'/>);
          }
      });
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
          <form action='' autoComplete='off'
          onSubmit={handleFormSubmit}>
            <h1>Login</h1>
            <p>
              Don't have an account?
              <Link to='/Signup'>
                <a href=''> Sign up</a>
              </Link>
            </p>
            <button id='fb-btn' type='button' onClick={handleFacebookSignIn}>
              <FacebookIcon id='fb' color='success' fontSize='normal' />
              <i></i> Login via Facebook
            </button>
            <div className='credentials'>
              <div id='user-label'>
                <label>
                  Email Address
                  {emailError}
                </label>
              </div>
              <input
                id='input-area'
                value={email}
                onChange={handleEmailChange}
                value={email}
                name='email'
                type='email'
                className='cred-box'
                required
              />
              <div id='user-label'>
                <label className='block'>
                  Password&nbsp;&nbsp;
                  {passwordError}
                </label>
                {/* <label className='error'>
                  (Hey you forgot to enter the Password)
                </label> */}
              </div>
              <input
                id='input-area'
                value={password}
                onChange={handlePasswordChange}
                value={password}
                name='password'
                type='password'
                className='cred-box'
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
