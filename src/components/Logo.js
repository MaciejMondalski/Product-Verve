import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/pv_logo.svg';
import { useAuthContext } from '../hooks/useAuthContext';

function Logo() {
  const { user, authIsReady } = useAuthContext();

  return (
    <StyledLogo>
      <Link to={'tasks/page-1'}>
        <img src={LogoImage} alt='verve logo' />
        <span className={`${!user && 'logo-purple'}`}>Product Verve</span>
      </Link>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  height: 4.2em;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    letter-spacing: 1px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  span {
    color: #fff;
    font-size: 1.8em;
    font-family: 'Chakra Petch', sans-serif;
    font-weight: 700;
    white-space: nowrap;
  }

  .logo-purple {
    color: var(--primary-color);
  }

  img {
    margin-right: 5px;
    filter: invert(95%);
    width: 32px;
    margin-top: -2px;
  }

  .logo-purple {
  }
`;

export default Logo;
