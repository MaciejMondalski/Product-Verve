import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/pv_logo.svg';

function Logo() {
  return (
    <StyledLogo>
      <Link to={'initiatives/page-1'}>
        <img src={LogoImage} alt='verve logo' />
        <span>Product Verve</span>
      </Link>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  //padding: 20px 30px;
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
    color: var(--bg-color);
    font-size: 1.6em;
    font-family: 'Chakra Petch', sans-serif;
    font-weight: 700;
  }

  img {
    margin-right: 5px;
    filter: invert(95%);
    width: 32px;
    margin-top: -2px;
  }
`;

export default Logo;
