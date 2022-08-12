import styled from 'styled-components';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import GoogleIcon from '../assets/g_icon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();
  const { signInWithGoogle } = useGoogleAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleGoogle = () => {
    signInWithGoogle();
  };

  return (
    <StyledLogin onSubmit={handleSubmit}>
      <div>
        <h2>Login</h2>

        <label>
          <span>email:</span>
          <input required type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </label>
        <label>
          <span>password:</span>
          <input required type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </label>

        {!isPending && <button className='btn login-btn'>Login</button>}
        {isPending && (
          <button className='btn login-btn' disabled>
            loading
          </button>
        )}

        {error && <div className='error'>{error}</div>}
        <div className='divider'>
          <span className='line'></span>
          <span id='or'>or</span>
          <span className='line'></span>
        </div>
        <button type='button' className='btn google-btn' onClick={handleGoogle}>
          <div>
            <img src={GoogleIcon} alt='google icon' />
            Continue with Google
          </div>
        </button>
      </div>
    </StyledLogin>
  );
}

const StyledLogin = styled.form`
  max-width: 360px;
  width: 100%;
  margin: 60px auto;
  padding: 40px;
  border: 1px solid #ddd;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  background: #fff;
  border-radius: 0.6em;

  input {
    border: 2px solid #ddd;
    background-color: var(--input-color);
  }

  button {
    padding: 14px;
  }

  .login-btn {
    width: 100%;
    color: #fff;
    background-color: var(--primary-color);
    margin: 20px 0;
    transition-duration: 0.1s;

    &:hover {
      filter: brightness(1.1);
    }
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .line {
      height: 0.1em;
      width: 100%;
      background-color: #ddd;
      color: green;
    }
    #or {
      text-align: center;
      color: grey;
      font-size: 0.9em;
      padding: 0 0.6em;
    }
  }

  .google-btn {
    margin: 20px 0;
    width: 100%;
    color: var(--heading-color);
    background-color: white;
    border-radius: 0.6em;
    font-size: 1em;
    border: 2px solid var(--heading-color);
    transition-duration: 0.1s;

    &:hover {
      filter: brightness(0.96);
      color: black;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 1.1em;
        padding-right: 10px;
      }
    }
  }
`;

export default Login;
