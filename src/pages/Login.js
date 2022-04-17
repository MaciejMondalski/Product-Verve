import styled from 'styled-components';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <StyledLogin onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        <span>email:</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!isPending && <button className='btn'>Login</button>}
      {isPending && (
        <button className='btn' disabled>
          loading
        </button>
      )}

      {error && <div className='error'>{error}</div>}
    </StyledLogin>
  );
}

const StyledLogin = styled.form`
  max-width: 360px;
  margin: 60px auto;
  padding: 40px;
  border: 1px solid #ddd;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  background: #fff;
`;

export default Login;
