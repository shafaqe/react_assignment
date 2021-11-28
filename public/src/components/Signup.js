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
import Sad from '@material-ui/icons/SentimentVeryDissatisfied';
import Happy from '@material-ui/icons/SentimentSatisfiedAlt';

const Signup = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName('');
    setFirstName(e.target.value);
    if (firstName !== '') {
      setFirstNameError(<Happy id='firstname-emoj-pve' />);
    } else {
      setFirstNameError(<Sad id='firstname-emoj-nve' />);
    }
  };
  const handleLastNameChange = (e) => {
    setLastName('');
    setLastName(e.target.value);
    if (firstName !== '') {
      setFirstNameError(<Happy id='firstname-emoj-pve' />);
    } else {
      setFirstNameError(<Sad id='firstname-emoj-nve' />);
    }
    if (lastName !== '') {
      setLastNameError(<Happy id='lastname-emoj-pve' />);
    } else {
      setLastNameError(<Sad id='lastname-emoj-nve' />);
    }
  };

  const handleEmailChange = (e) => {
    setEmailError('');
    setEmail(e.target.value);
    if (firstName !== '') {
      setFirstNameError(<Happy id='firstname-emoj-pve' />);
    } else {
      setFirstNameError(<Sad id='firstname-emoj-nve' />);
    }
    if (lastName !== '') {
      setLastNameError(<Happy id='lastname-emoj-pve' />);
    } else {
      setLastNameError(<Sad id='lastname-emoj-nve' />);
    }
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
    if (firstName !== '') {
      setFirstNameError(<Happy id='firstname-emoj-pve' />);
    } else {
      setFirstNameError(<Sad id='firstname-emoj-nve' />);
    }
    if (lastName !== '') {
      setLastNameError(<Happy id='lastname-emoj-pve' />);
    } else {
      setLastNameError(<Sad id='lastname-emoj-nve' />);
    }
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
      // setPasswordError(<h5>(Hey you forgot to create the password)</h5>);
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

  const onSignup = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: firstName + ' ' + lastName,
        }).then(() => {
          history.push('/dashboard');
        });
      })
      .catch((error) => {
        alert(error.message);
        if (firstName !== '') {
          setFirstNameError(<Happy id='firstname-emoj-pve' />);
        } else {
          setFirstNameError(<Sad id='firstname-emoj-nve' />);
        }
        if (lastName !== '') {
          setLastNameError(<Happy id='lastname-emoj-pve' />);
        } else {
          setLastNameError(<Sad id='lastname-emoj-nve' />);
        }
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
          setPasswordError(<Happy id='pass-emoj-nve' />);
        } else {
          // setPasswordError(<h5>(Hey you forgot to create the password)</h5>);
          setPasswordError(<Sad id='pass-emoj-ve' />);
        }
      });
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
          <form action='' autoComplete='off' onSubmit={handleFormSubmit}>
            <h1>Sign-up</h1>
            <p>
              Already have an account? <Link to='/'>Login</Link>
            </p>
            <button id='fb-btn' type='button' onClick={handleFacebookSignIn}>
              <FacebookIcon id='fb' color='success' fontSize='normal' />
              <i></i> Join via Facebook
            </button>
            <div className='name'>
              <div className='firstname'>
                <div id='name-label'>
                  <label>
                    First Name
                    {firstNameError}
                  </label>
                </div>
                <input
                  id='name-area'
                  type='text'
                  onChange={handleFirstNameChange}
                  name='firstName'
                />
              </div>
              <div className='lastname'>
                <div id='name-label'>
                  <label>
                    Last Name
                    {lastNameError}
                  </label>
                </div>
                <input
                  id='name-area'
                  type='text'
                  onChange={handleLastNameChange}
                  name='lastName'
                />
              </div>
            </div>
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
                (Hey you forgot to create the Password)
              </label> */}
            </div>
            <input
              id='input-area'
              value={password}
              onChange={handlePasswordChange}
              name='password'
              type='password'
              className='cred-box'
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
